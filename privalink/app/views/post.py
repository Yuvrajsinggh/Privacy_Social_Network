from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from app.models import Post, PostLike, PostReport, PostComment   
from app.serializer import PostSerializer, CommentSerializer, PostLikeSerializer, PostReportSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status



class CreatePost(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    

class RetrievePost(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
class RetrievePosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.privacy_status:
            # posts = Post.objects.filter(user__followers=user).exclude(anonymous_status=True)
            posts = Post.objects.filter(user_id=user).exclude(anonymous_status=True)
        else:
            posts = Post.objects.exclude(anonymous_status=True)
        
        serialized_data = self.serializer_class(posts, many=True)

        return Response({"success": True, "posts": serialized_data.data}, status=status.HTTP_200_OK)
        
class RetrieveAnonymousPosts(generics.ListAPIView):
    queryset = Post.objects.filter(anonymous_status=True)
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # def get(self):
    #    return Post.objects.filter(anonymous_status=True)
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        # Serialize the data, but replace the 'user' field with 'anonymous_name'
        serialized_data = self.serializer_class(queryset, many=True)
        # for data in serialized_data.data:
        #     if data['user'] == 'Anonymous':
        #         data['user'] = data['anonymous_name']
                        
        return Response({"success": True, "posts": serialized_data.data})

class UpdatePost(APIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data, partial=True)        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"success": True, "message":"post updated"})
        else:
            return Response({"success": False, "message":"error updating post"})

class DestroyPost(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        try:
            pk = kwargs.get("pk")
            post = Post.objects.get(id=pk)
            if post.user.id == request.user.id:
                self.perform_destroy(post)
                return Response({"success": True, "message":"post deleted"})
            else:
                return Response({"success": False, "message":"not enough permissions"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})

class RetieveUserPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    
    def list(self, request, *args, **kwargs):
        user_posts = Post.objects.filter(user=request.user.id)
        serializer = self.serializer_class(user_posts, many=True)
        
        non_anonymous_posts = []
        anonymous_posts = []

        for post in serializer.data:
            if post['anonymous_status']:
                anonymous_posts.append(post)
            else:
                non_anonymous_posts.append(post)

        # Return the two separate lists
        return Response({
            "success": True,
            "anonymous_posts": anonymous_posts,
            "non_anonymous_posts": non_anonymous_posts
        })

class LikePost(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            likes_list = PostLike.objects.filter(post=post)
            # request.data["post"] = post
            serializer = PostLikeSerializer(likes_list, many=True)
            return Response({"success": True, "likes_list": serializer.data})
            
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})


    def post(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            new_post_like = PostLike.objects.get_or_create(user=request.user, post=post)
            if not new_post_like[1]:
                new_post_like[0].delete()
                return Response({"success": True, "message":"post unliked"})
            else:
                return Response({"success": True, "message":"post liked"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})

class GetPostLikes(APIView):
    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            likes_count = PostLike.objects.filter(post=post).count()
            return Response({"success": True, "likes_count": likes_count}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"success": False, "message": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)


class ReportPost(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            reports_list = PostReport.objects.filter(post=post)
            # request.data["post"] = post
            serializer = PostReportSerializer(reports_list, many=True)
            return Response({"success": True, "reports_list": serializer.data})
            
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})
    
    def post(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            new_post_report = PostReport.objects.get_or_create(user=request.user, post=post)
            if not new_post_report[1]:
                new_post_report[0].delete()
                return Response({"success": True, "message":"post unreported"})
            else:
                return Response({"success": True, "message":"post reported"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})
            

class CommentPost(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
            comments = PostComment.objects.filter(post=post)
            # request.data["post"] = post
            serializer = self.serializer_class(comments, many=True)
            return Response({"success": True, "comments": serializer.data})
            
        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})


    def post(self, request, pk):
        try:
            context = {
                "request": request
            }
            post = Post.objects.get(id=pk)
            # request.data["post"] = post
            serializer = self.serializer_class(context=context, data=request.data)
            if serializer.is_valid():
                serializer.save(post=post)
                return Response({"success": True, "message":"comment added"})
            else:   
                return Response({"success": False, "message":"error adding a comment"})

        except ObjectDoesNotExist:
            return Response({"success": False, "message":"post does not exist"})

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [CanViewPost]
