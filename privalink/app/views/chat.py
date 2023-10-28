from django.shortcuts import render
from app.models import Conversation, GroupMessage, Group
from rest_framework import permissions
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import User 
from app.serializer import ConversationListSerializer, ConversationSerializer, GroupSerializer, GroupMessageSerializer
from django.db.models import Q
from django.shortcuts import redirect, reverse



def start_convo(request, ):
    try:
        participant = User.objects.get(username=request.data.get('username'))
    except User.DoesNotExist:
        return Response({'message': 'You cannot chat with a non existent user'})

    conversation = Conversation.objects.filter(Q(initiator=request.user, receiver=participant) |
                                               Q(initiator=participant, receiver=request.user))
    if conversation.exists():
        return redirect(reverse('get_conversation', args=(conversation[0].id,)))
    else:
        conversation = Conversation.objects.create(initiator=request.user, receiver=participant)
        return Response(ConversationSerializer(instance=conversation).data)


def get_conversation(request, convo_id):
    conversation = Conversation.objects.filter(id=convo_id)
    if not conversation.exists():
        return Response({'message': 'Conversation does not exist'})
    else:
        serializer = ConversationSerializer(instance=conversation[0])
        return Response(serializer.data)


def conversations(request):
    conversation_list = Conversation.objects.filter(Q(initiator=request.user) |
                                                    Q(receiver=request.user))
    serializer = ConversationListSerializer(instance=conversation_list, many=True)
    return Response(serializer.data)



class CreateGroupView(generics.CreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class ListGroupsView(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class SendGroupMessageView(generics.CreateAPIView):
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class GroupInboxView(generics.ListAPIView):
    serializer_class = GroupMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        group_id = self.kwargs['group_id']
        return GroupMessage.objects.filter(group__id=group_id)