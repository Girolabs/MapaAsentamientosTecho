from django.shortcuts import render, render_to_response

from django.http import HttpResponse


def index(request):
    return render_to_response('base.html')

# Create your views here.
