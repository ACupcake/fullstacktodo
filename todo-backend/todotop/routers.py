from django.urls import include, path

urlpatterns = [
    path("todo/", include("todo.urls"), name="todo"),
    path("", include("Author.urls"), name="author"),
]

