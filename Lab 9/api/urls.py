from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('companies/', company),
    path('companies/<int:id>/', get_company_byId),
    path('companies/<int:id>/vacancies', get_vacancies_by_company),
    path('vacancies/', get_vacancy),
    path('vacancies/<int:id>/',get_vacancy_byId),
    path('vacancies/top_ten/', get_topTen_vacancy)
]