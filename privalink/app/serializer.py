from rest_framework import serializers
# from django.contrib.auth.models import Group
from app.models import User, Post, PostComment, PostLike, PostReport, UserFollow, Conversation, Message, Group, GroupMessage

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'anonymous_name','password', 'privacy_status']

    def create(self, validated_data):
        groups_data = validated_data.pop('groups', [])  # Remove groups from validated_data
        user = User.objects.create(**validated_data)
        
        # Add the user to groups using .set()
        user.groups.set(groups_data)

        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"
        
    description = serializers.CharField()

    def get_user(self, obj):
        user = obj.user
        if user:
            return user.username
        return "Anonymous"
    
    def to_representation(self, instance):
        data = super(PostSerializer, self).to_representation(instance)
        if instance.anonymous_status and instance.user:
            data['user'] = instance.user.anonymous_name
        return data

    def update(self, instance, validated_data):
        if instance.user.id == validated_data["user"].id:
            return super().update(instance, validated_data)
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = "__all__"
    comment_text = serializers.CharField(max_length=264)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)

    def save(self, **kwargs):
        self.post = kwargs["post"]
        return super().save(**kwargs)

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = "__all__"
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)

class PostReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReport
        fields = "__all__"
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = "__all__"
    
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    follows_id = serializers.PrimaryKeyRelatedField(read_only=True)


#below 3 classes(including their subclasses) will be used for messaging functionality.

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ('conversation_id',)


class ConversationListSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    receiver = UserSerializer()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['initiator', 'receiver', 'last_message']

    def get_last_message(self, instance):
        message = instance.message_set.first()
        return MessageSerializer(instance=message)


class ConversationSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    receiver = UserSerializer()
    message_set = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['initiator', 'receiver', 'message_set']

# below class will be used for group messaging

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class GroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMessage
        fields = '__all__'


