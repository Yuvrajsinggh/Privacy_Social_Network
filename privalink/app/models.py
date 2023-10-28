from django.db import models
from django.contrib.auth.models import AbstractUser
# from app.manager import UserManager
from django.conf import settings

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=16)
    privacy_status = models.BooleanField(default=False)
    anonymous_name = models.CharField(null=True, max_length=30)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    # USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    # objects = UserManager()

class Post(models.Model):
    description = models.CharField(max_length=164)
    anonymous_status = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    #permissions = models.OneToOneField(PostPermission, related_name='post', on_delete=models.CASCADE)
    

class PostLike(models.Model):
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("post","user"), )

class PostReport(models.Model):
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("post","user"), )

class PostComment(models.Model):
    comment_text = models.CharField(max_length=264)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)

class UserFollow(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name="src_follow")
    follows_id = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name="dest_follow")
    


#below two classes(including their sub classes) are created for messaging function.

class Conversation(models.Model):
    initiator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="convo_starter"
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="convo_participant"
    )
    start_time = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
                              null=True, related_name='message_sender')
    text = models.CharField(max_length=200, blank=True)
    attachment = models.FileField(blank=True)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE,)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-timestamp',)

#below 2 classes will be used for group creation and messaging feature


class Group(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User, related_name='group_membership')

class GroupMessage(models.Model):
    group = models.ForeignKey(Group, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sent_group_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

#below class will be used for postprivacy

# class PostPermission(models.Model):
#     post= models.ForeignKey(Post, related_name= 'permissions', on_delete=models.CASCADE)
#     allowed_users = models.ManyToManyField(User, related_name='allowed_users')

#     def can_view(self,user):
#         return user in self.allowed_users.all()
    

# class CanViewPost(models.BasePermission):

#     def has_permission(self, request, view):
#         if request.user.is_authenticated:
#             return view.get_object().content.permissions.can_view(request.user)
#         return False
    

