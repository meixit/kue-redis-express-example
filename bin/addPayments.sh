# !/bin/bash
CURL='/usr/bin/curl'
clear

curl -H "Content-Type: application/json" -X POST -d \
"[{
	\"title\": \"Order #ASC\",
	\"paymentToken\": \"fa23\",
	\"orderID\": \"1a2b3c4\",
	\"received\": true
},
{
	\"title\": \"Order #ASC\",
	\"paymentToken\": \"fa23\",
	\"orderID\": \"1a2b3c4\",
	\"received\": true
}]" http://localhost:3000/payments
