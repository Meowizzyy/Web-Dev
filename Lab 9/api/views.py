from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *

# Create your views here.


def company(request):
    company_list = list(Company.objects.values())

    return JsonResponse(company_list,safe=False)

def get_company_byId(request,id):
    company_list = list(Company.objects.filter(id = id).values())

    return JsonResponse(company_list,safe=False)


def get_vacancies_by_company(request,id):

    vacancy_list = list(Vacancy.objects.filter(id = id).values())

    return JsonResponse(vacancy_list,safe=False)

def get_vacancy(request):
    vacancy_list = list(Vacancy.objects.values())

    return JsonResponse(vacancy_list,safe=False)

def get_vacancy_byId(request,id):
    vacancy_list = list(Vacancy.objects.filter(id = id).values())

    return JsonResponse(vacancy_list,safe=False)

def get_topTen_vacancy(request):
    top_ten_vacancies = list(Vacancy.objects.order_by('-salary')[:10].values())
    
    return JsonResponse(top_ten_vacancies, safe=False)


