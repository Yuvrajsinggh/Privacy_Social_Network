from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from app.views.user import CreateUser, LoginUserView, LogoutView, RetrieveUser, GetCurrentUser, RetrieveUsers, UpdateUser, DestroyUser, FollowUser, GetUserFollowCounts, ForgotPasswordView
from app.views.post import CreatePost,RetrievePosts , RetrievePost, RetrieveAnonymousPosts, UpdatePost, DestroyPost, RetieveUserPosts, LikePost, GetPostLikes, CommentPost, ReportPost, RetrieveOtherUserPosts
from app.views.chat import start_convo, get_conversation, conversations, SendGroupMessageView, GroupInboxView, CreateGroupView, ListGroupsView
# from app.form import CustomPasswordResetForm
urlpatterns = [
    path('user/create/', CreateUser.as_view()),
    path('user/login/', LoginUserView.as_view()),
    path('user/logout/', LogoutView.as_view()),
    path('user/<int:pk>/', RetrieveUser.as_view()),
    path('user/current/', GetCurrentUser.as_view()),
    path('user/retrieveusers/', RetrieveUsers.as_view()),
    path('user/update/', UpdateUser.as_view()),
    path('user/delete/<int:pk>/', DestroyUser.as_view()),
    path('user/follow/<int:pk>/', FollowUser.as_view()),
    path('user/followcount/<int:pk>/', GetUserFollowCounts.as_view()),
    path('user/forgot_password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('posts/general/', RetrievePosts.as_view()),
    path('posts/anonymous/', RetrieveAnonymousPosts.as_view()),
    path('posts/userposts/', RetieveUserPosts.as_view()),
    path('posts/otheruserposts/<int:pk>/', RetrieveOtherUserPosts.as_view()),
    path('post/create/', CreatePost.as_view()),
    path('post/<int:pk>/', RetrievePost.as_view()), 
    path('post/update/<int:pk>/', UpdatePost.as_view()), 
    path('post/delete/<int:pk>/', DestroyPost.as_view()), 
    path('post/like/<int:pk>/', LikePost.as_view()) , 
    path('post/likes/<int:pk>/', GetPostLikes.as_view()) , 
    path('post/comment/<int:pk>/', CommentPost.as_view()) , 
    path('post/comments/<int:pk>/', CommentPost.as_view()) , 
    path('post/report/<int:pk>/', ReportPost.as_view()) , 

    #below paths are for one-one messaging and group messaging feature
    path('conversation/start/', start_convo, name='start_convo'),
    path('conversation/<int:convo_id>/', get_conversation, name='get_conversation'),
    path('conversations/', conversations, name='conversations'),
    path('group/create_group/', CreateGroupView.as_view()),
    path('groups/', ListGroupsView.as_view()),
    path('group/send/', SendGroupMessageView.as_view()),
    path('group/inbox/<int:group_id>/', GroupInboxView.as_view()),

    # below paths are for forgot password feature
    # path('password_reset/', auth_views.PasswordResetView.as_view(form_class=CustomPasswordResetForm,
    #     template_name='registration/password_reset_form.html',email_template_name='registration/password_reset_email.html'),
    #     name='password_reset'),
    # path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'),
    #       name='password_reset_done'),
    # path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'),
    #       name='password_reset_confirm'),
    # path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'),
    #       name='password_reset_complete'),
]
    
