// /api/new-meetup - if a request is sent to this url then the function here runs
import { MongoClient } from "mongodb";

async function handler(request, response) {
  if (request.method === "POST") {
    const data = request.body;

    const client = await MongoClient.connect(
      "mongodb://souvik3469:souvik3469@ac-o3szvmi-shard-00-00.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-01.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-02.om2cqtz.mongodb.net:27017/?ssl=true&replicaSet=atlas-mchkpk-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    response
      .status(201)
      .json({ message: "meetup has been added to the database successfuly" });
  }
}

export default handler;