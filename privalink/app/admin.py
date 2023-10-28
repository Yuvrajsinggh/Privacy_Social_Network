from django.contrib import admin
from .models import User, Post, PostLike, PostComment, PostReport 

class UserAdmin(admin.ModelAdmin):
    list_display = ('id','email','username','password','first_name','last_name', 'anonymous_name', 'privacy_status')

admin.site.register(User, UserAdmin)

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'description','created_at','updated_at','user')

admin.site.register(Post, PostAdmin)

class PostLikeAdmin(admin.ModelAdmin):
    list_display = ('post','user')

admin.site.register(PostLike, PostLikeAdmin)

class PostCommentAdmin(admin.ModelAdmin):
    list_display = ('comment_text','created_at','updated_at','user','post')

admin.site.register(PostComment, PostCommentAdmin)

class PostReportAdmin(admin.ModelAdmin):
    list_display = ('post','user')

admin.site.register(PostReport, PostReportAdmin)