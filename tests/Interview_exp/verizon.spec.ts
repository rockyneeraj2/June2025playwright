/*

{
  "createdAt": "2026-09-18T10:25:30Z"
}

Instant actualTime =
        Instant.parse(response.jsonPath().getString("createdAt"));

Instant currentTime = Instant.now();

long difference =
        Math.abs(Duration.between(actualTime, currentTime).getSeconds());

Assert.assertTrue(difference <= 10,
        "Timestamp is not within expected time");

        String timestamp = response.jsonPath().getString("createdAt");

Instant.parse(timestamp);   // throws exception if invalid

System.out.println("Valid timestamp: " + timestamp);

*/