from rest_framework import generics
from rest_framework.views import APIView
import random
import string
from app.serializer import UserSerializer, UserLoginSerializer, UserFollowSerializer
from app.models import User, UserFollow 
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework.authtoken.models import Token

from rest_framework.generics import CreateAPIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.core.mail import send_mail

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        # Check if a user with the same email or username already exists
        email = request.data.get("email")
        username = request.data.get("username")

        if User.objects.filter(email=email).exists() or User.objects.filter(username=username).exists():
            return Response({"success": False, "message": "Account already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random unique anonymous name
        anonymous_name = self.generate_unique_anonymous_name()
        request.data["anonymous_name"] = anonymous_name

        response = super().create(request, *args, **kwargs)

        return Response({"success": True, "message": "User created successfully"}, status=status.HTTP_201_CREATED)

    def generate_unique_anonymous_name(self, length=10):
        while True:
            # Generate a random name of the specified length
            name = ''.join(random.choices(string.ascii_letters, k=15))
            name = 'anonymous' + name
            # Check if a user with this anonymous name already exists
            if not User.objects.filter(anonymous_name=name).exists():
                return name

class LoginUserView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data["email"])
                if user.password == serializer.validated_data["password"]:
                    token = Token.objects.get_or_create(user=user)
                    return Response({"success": True, "token":token[0].key})
                else:
                    return Response({"success": False, "message":"incorrect password"})
                    
            except ObjectDoesNotExist:
                return Response({"success": False, "message":"user does not exist"})

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"success": True, "message": "Logged out successfully"}, status=status.HTTP_200_OK)

class RetrieveUser(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetCurrentUser(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class RetrieveUsers(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        name = request.query_params.get('name', None)
        username = request.query_params.get('username', None)

        if not name and not username:
            return Response({"success": False, "message": "Provide a name or username to search."}, status=400)

        users = User.objects.filter(Q(first_name__iexact=name) | Q(username__iexact=username))

        if not users:
            return Response({"success": False, "message": "No users found with the given name or username."}, status=404)

        serializer = self.serializer_class(users, many=True)
        return Response({"success": True, "users": serializer.data})


class UpdateUser(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message":"user updated", "user": serializer.data})
        else:
            return Response({"success": False, "message":"error updating user"})

class DestroyUser(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            if pk == request.user.id:
                self.perform_destroy(request.user)
                return Response({"success": True, "message":"user deleted"})
            else:
                return Response({"success": False, "message":"not enough permissions"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"user does not exist"})

class FollowUser(APIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        following = UserFollow.objects.filter(user=request.user)
        followers = UserFollow.objects.filter(follows_id=request.user)

        following_serializer = UserFollowSerializer(following, many=True)
        followsers_serializer = UserFollowSerializer(followers, many=True)
        return Response({"success": True, "following": following_serializer.data, "followers": followsers_serializer.data})

    def post(self, request, pk):
        try:
            following_user = User.objects.get(id=pk)
            follow_user = UserFollow.objects.get_or_create(user=request.user, follows_id=following_user)            
            if not follow_user[1]:
                follow_user[0].delete()
                return Response({"success": True, "message":"unfollowed user"})
            else:
                return Response({"success": True, "message":"followed user"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"following user does not exist"})

class GetUserFollowCounts(APIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)

            # Get the number of followers
            followers_count = UserFollow.objects.filter(follows_id=user).count()

            # Get the number of users the current user is following
            following_count = UserFollow.objects.filter(user=user).count()

            return Response({
                "success": True,
                "followers_count": followers_count,
                "following_count": following_count,
            })

        except User.DoesNotExist:
            return Response({"success": False, "message": "User not found"}, status=404)

#Ujjawal Made Forgot Password

class ForgotPasswordView(CreateAPIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"message": "User with this email does not exist."},
            )

        # Generate a token for password reset
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Create a reset link
        reset_link = f"http://your-frontend-url/reset-password/{uid}/{token}/"

        # Send a reset password email to the user
        subject = "Password Reset"
        message = render_to_string(
            "password_reset_email.txt",
            {"reset_link": reset_link, "user": user},
        )
        from_email = "patelujjawal1845@email.com"  # Update with your email
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return Response(
            {"message": "Password reset link sent to your email."},
        )
    
