SELECT * FROM public.cl_participants
WHERE call_id = 1833719
"id"	"call_id"	"info_id"	"role"	"is_inbound"	"end_status"	            "forward_reason"	"failure_reason"	"start_time"	             "answer_time"	            "end_time"	"billing_code"	"billing_ratename"	"billing_rate"	"billing_cost"	"billing_duration"	"recording_url"	"billing_group"
5743305	1833719	5743126	2	false	2	1	10	                                                                            "2022-08-25 13:30:11+00"		                        "2022-08-25 13:30:21+00"							
5743304	1833719	5743125	2	false	0	0	1	                                                                             "2022-08-25 13:29:53+00"		                         "2022-08-25 13:29:53+00"							
5743303	1833719	5743124	2	false	3	2	13	                                                                             "2022-08-25 13:29:53+00"		                        "2022-08-25 13:29:53+00"							
5743302	1833719	5743123	1	false	1	0	1	                                                                            "2022-08-25 13:29:53+00"	"2022-08-25 13:29:53+00"	  "2022-08-25 13:30:21+00"							
5743301	1833719	5743122	1	false	1	0	1	                                                                            "2022-08-25 13:29:42+00"	"2022-08-25 13:29:42+00"	"2022-08-25 13:29:53+00"							
5743300	1833719	5743121	2	false	0	0	1	                                                                            "2022-08-25 13:29:42+00"		                        "2022-08-25 13:29:42+00"							
5743299	1833719	5743120	1	true	1	0	1	                                                                            "2022-08-25 13:29:42+00"	"2022-08-25 13:29:42+00"	"2022-08-25 13:30:21+00"			

SELECT * FROM public.cl_party_info
WHERE id in (5743120,5743121,5743122,5743123,5743124,5743125,5743126)
"id"	"dn_type"	"dn"	"caller_number"	"display_name"	"dn_class"	"firstlastname"	"did_number"
5743120	1	"10013"	"88432023009"	"8432023009"	2		"580085"
5743121	6	"822"	"Ext.822"	"Общий"	0		
5743122	6	"822"	"Ext.822"	"Общий"	0		
5743123	6	"808"	"Ext.808"	"Сбыт-занято261"	0		
5743124	0	"263"	"Ext.263"	"Елена Сизова"	0		
5743125	6	"808"	"Ext.808"	"Сбыт-занято261"	0		
5743126	0	"261"	"Ext.261"	"Александра Махаева"	0		

{
   "originCallInfo":{
      "historyid":"1833719",
      "callid":"00000C1A05E82204_71510",
      "duration":39,
      "timeStart":"2022-08-25 16:29:42",
      "timeAnswered":"2022-08-25 16:29:42",
      "timeEnd":"2022-08-25 16:30:21",
      "reasonTerminated":"TerminatedByRule",
      "fromNo":"88432023009",
      "toNo":"Ext.822",
      "fromDn":"10013",
      "toDn":"822",
      "dialNo":"822",
      "reasonChanged":"ReplacedDst",
      "finalNumber":"Ext.261",
      "finalDn":"261",
      "billCode":"",
      "billRate":"",
      "billCost":"",
      "billName":"",
      "chain":"Chain: 88432023009;Ext.822;Ext.263;Ext.808;Ext.261;"
   },
   "apiCallInfo":{
      "uniq":"6be3d151-d288-4dbd-a57d-031fea9bd1e5",
      "3cxId":"1833719",
      "incomingNumber":"88432023009",
      "dialedNumber":"4852580085",
      "extension":"822",
      "duration":"39",
      "createdAt":"2022-08-25 19:30:19",
      "callStatus":"inbound",
      "callResult":"TerminatedByRule",
      "route":[
         "88432023009",
         "822",
         "263",
         "808",
         "261"
      ],
      "link":""
   },
   "isExternal":true
}










SELECT * FROM public.cl_participants
WHERE call_id = 1833683

"id"	"call_id"	"info_id"	"role"	"is_inbound"	"end_status"	"forward_reason"	"failure_reason"	"start_time"	            "answer_time"	        "end_time"	"billing_code"	"billing_ratename"	"billing_rate"	"billing_cost"	"billing_duration"	"recording_url"	"billing_group"
5743202	1833683	5743023	2	false	0	0	1	                                                                "2022-08-25 13:21:36+00"		                    "2022-08-25 13:21:42+00"							
5743201	1833683	5743022	1	false	1	0	1	                                                                "2022-08-25 13:21:42+00"	"2022-08-25 13:21:42+00"	"2022-08-25 13:21:52+00"						"264/[375175435220]_8375175435220-264_20220825132142(71477).wav"	
5743200	1833683	5743021	1	false	1	0	1	                                                                "2022-08-25 13:21:32+00"	"2022-08-25 13:21:32+00"	"2022-08-25 13:21:42+00"							
5743199	1833683	5743020	2	false	0	0	1	                                                                "2022-08-25 13:21:32+00"		                        "2022-08-25 13:21:32+00"							
5743198	1833683	5743019	1	true	1	0	1	                                                                "2022-08-25 13:21:32+00"	"2022-08-25 13:21:32+00"	"2022-08-25 13:21:52+00"							

SELECT * FROM public.cl_party_info
WHERE id in (5743019,5743020,5743021,5743022,5743023)


"id"	"dn_type"	"dn"	"caller_number"	"display_name"	"dn_class"	"firstlastname"	"did_number"
5743019	1	"10013"	"8375175435220"	"375175435220"	2		"580085"
5743020	6	"822"	"Ext.822"	"Общий"	0		
5743021	6	"822"	"Ext.822"	"Общий"	0		
5743022	0	"264"	"Ext.264"	"Юлия Леванова"	0	"Юлия Леванова"	
5743023	0	"264"	"Ext.264"	"Юлия Леванова"	0		

{
   "originCallInfo":{
      "historyid":"1833683",
      "callid":"00000C1A05E0A784_71477",
      "duration":20,
      "timeStart":"2022-08-25 16:21:32",
      "timeAnswered":"2022-08-25 16:21:32",
      "timeEnd":"2022-08-25 16:21:52",
      "reasonTerminated":"TerminatedBySrc",
      "fromNo":"8375175435220",
      "toNo":"Ext.822",
      "fromDn":"10013",
      "toDn":"822",
      "dialNo":"822",
      "reasonChanged":"ReplacedDst",
      "finalNumber":"Ext.264",
      "finalDn":"264",
      "billCode":"",
      "billRate":"",
      "billCost":"",
      "billName":"",
      "chain":"Chain: 8375175435220;Ext.822;Ext.264;"
   },
   "apiCallInfo":{
      "uniq":"fc91999d-279d-4280-b07a-7d7f32986b87",
      "3cxId":"1833683",
      "incomingNumber":"8375175435220",
      "dialedNumber":"4852580085",
      "extension":"822",
      "duration":"20",
      "createdAt":"2022-08-25 19:21:51",
      "callStatus":"inbound",
      "callResult":"TerminatedBySrc",
      "route":[
         "8375175435220",
         "822",
         "264"
      ],
      "link":""
   },
   "isExternal":true
}







SELECT * FROM public.cl_participants
WHERE call_id = 1833369
"id"	"call_id"	"info_id"	"role"	"is_inbound"	"end_status"	"forward_reason"	"failure_reason"	"start_time"	"answer_time"	"end_time"	"billing_code"	"billing_ratename"	"billing_rate"	"billing_cost"	"billing_duration"	"recording_url"	"billing_group"
5742198	1833369	5742019	1	false	1	0	1	"2022-08-25 11:52:36+00"	"2022-08-25 11:52:36+00"	"2022-08-25 11:54:26+00"						"272/[8126034346]_88126034346-272_20220825115236(71168).wav"	
5742197	1833369	5742018	2	false	0	0	1	"2022-08-25 11:52:32+00"		"2022-08-25 11:52:36+00"							
5742196	1833369	5742017	1	true	1	0	1	"2022-08-25 11:52:32+00"	"2022-08-25 11:52:36+00"	"2022-08-25 11:54:26+00"							

SELECT * FROM public.cl_party_info
WHERE id in (5742017,5742018,5742017)

"id"	"dn_type"	"dn"	"caller_number"	"display_name"	"dn_class"	"firstlastname"	"did_number"
5742017	1	"10006"	"88126034346"	"8126034346"	2		"272"
5742018	0	"272"	"Ext.272"	"Виктория Винницкая"	0		

{
   "originCallInfo":{
      "historyid":"1833369",
      "callid":"00000C1A058F2F80_71168",
      "duration":109,
      "timeStart":"2022-08-25 14:52:32",
      "timeAnswered":"2022-08-25 14:52:36",
      "timeEnd":"2022-08-25 14:54:26",
      "reasonTerminated":"TerminatedBySrc",
      "fromNo":"88126034346",
      "toNo":"Ext.272",
      "fromDn":"10006",
      "toDn":"272",
      "dialNo":"272",
      "reasonChanged":"",
      "finalNumber":"",
      "finalDn":"",
      "billCode":"",
      "billRate":"",
      "billCost":"",
      "billName":"",
      "chain":"Chain: 88126034346;Ext.272;"
   },
   "apiCallInfo":{
      "uniq":"421d2217-a003-49ca-b521-f55b6b5e322b",
      "3cxId":"1833369",
      "incomingNumber":"88126034346",
      "extension":"272",
      "duration":"109",
      "createdAt":"2022-08-25 17:54:25",
      "callStatus":"outbound",
      "callResult":"TerminatedBySrc",
      "route":[
         "88126034346",
         "272"
      ],
      "link":""
   },
   "isExternal":true
}


host    all             all             192.168.5.198/32        password
host    all             all             10.212.134.100/32        password
host    all             all             192.168.5.247/32        password

856