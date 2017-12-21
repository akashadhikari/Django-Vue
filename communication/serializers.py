from rest_framework import serializers
from .models import Process, Purpose

class ProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Process
		fields = ('id', 'client_name', 'contact_person', 'medium_action', 'medium_type', 'medium_status', 'remainder_date', 'created')

class PurposeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Purpose
		fields = ('name', 'purpose_description', 'approached_date')

# from rest_framework import serializers
 
# from .models import Company, Billing
 
 
# class BillingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Billing
#         fields = ('department_name', 'expenditure_point', 'amount', 'payment_date', 'status')
 
 
# class CompanySerializer(serializers.ModelSerializer):
#     billings = BillingSerializer(many=True)
 
#     class Meta:
#         model = Company
#         fields = ('company_name', 'billings')