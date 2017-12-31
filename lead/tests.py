from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase


class LeadItemTest(APITestCase):
    def test_lead_item_list(self):
        """
        Test for post and get
        """
        data = {
            'user': 1,
            'service': 'TJP',
            'unit': 1,
            'status': 'PENDING'
        }

        # sending correct data
        print("-----post data --------")
        test_user = User(username="test", password="test")
        test_user.set_password("test")
        test_user.save()

        url = reverse(viewname="lead-items-list")
        response = self.client.post(url, data, format='json')

        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = {
            'user': 1,
            'service': 'FJP',
            'unit': 1,
            'status': 'PENDING'
        }
        response = self.client.post(url, data, format='json')

        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = {
            'user': 1,
            'service': 'GJP',
            'unit': 1,
            'status': 'PENDING'
        }
        response = self.client.post(url, data, format='json')

        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = {
            'user': 1,
            'service': 'HJP',
            'unit': 1,
            'status': 'PENDING'
        }
        response = self.client.post(url, data, format='json')

        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        print("-----get data --------")
        url = reverse(viewname="lead-items-list")
        response = self.client.get(url, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        print("----deleting----------")
        url = reverse(viewname="lead-item-destroy-bulk")
        data = {
            "ids": [1, 2]
        }
        response = self.client.delete(url, data, format="json")
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # sending wrong data

        data = {
            'user': 1,
            'service': 'ABCD',
            'unit': 1,
            'status': 'PENDING',
        }

        print("-----get data --------")
        url = reverse(viewname="lead-items-list")
        response = self.client.get(url, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        print("-----post wrong data --------")
        url = reverse(viewname="lead-items-list")
        response = self.client.post(url, data, format='json')
        print(response.data)
        print(response.status_code, status.HTTP_400_BAD_REQUEST)

        url = reverse(viewname="lead-items-detail", kwargs={'pk': 3})

        # retrieving item
        print("-----retrieve item --------")
        response = self.client.get(url, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # updating item
        print("-----update item --------")
        data = {
            'user': 1,
            'service': 'GJP',
            'unit': 10,
            'bulk': True,
            'status': 'APPROVED'
        }

        response = self.client.put(url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
