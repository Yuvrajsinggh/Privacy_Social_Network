# from django.contrib.auth.forms import PasswordResetForm
# from django import forms
# from django.contrib.auth.forms import PasswordResetForm

# class CustomPasswordResetForm(PasswordResetForm):
#     # customize it as required.
#     email = forms.EmailField(
#         label="Email",
#         max_length=254,
#         widget=forms.EmailInput(attrs={'autocomplete': 'email'}),
#     )

#     def clean_email(self):
#         email = self.cleaned_data.get('email')
#         return email
