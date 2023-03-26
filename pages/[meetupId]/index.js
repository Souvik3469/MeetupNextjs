import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    "mongodb://souvik3469:souvik3469@ac-o3szvmi-shard-00-00.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-01.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-02.om2cqtz.mongodb.net:27017/?ssl=true&replicaSet=atlas-mchkpk-shard-0&authSource=admin&retryWrites=true&w=majority",
    {useUnifiedTopology: true}
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const allMeetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback:'blocking',
    paths: allMeetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // Do something like get data from API
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://souvik3469:souvik3469@ac-o3szvmi-shard-00-00.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-01.om2cqtz.mongodb.net:27017,ac-o3szvmi-shard-00-02.om2cqtz.mongodb.net:27017/?ssl=true&replicaSet=atlas-mchkpk-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;