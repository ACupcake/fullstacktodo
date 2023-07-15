from rest_framework import serializers

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    # TODO: password confirmation
    class Meta:
        model = User
        fields = ["username", "password", "email"]

    def is_email_valid(self, email):
        return email != None and email != ''

    def validate(self, data):
        email = data.get('email', None)
        if not self.is_email_valid(email):
            raise serializers.ValidationError({"email": "Email must be valid."})
        return data

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
