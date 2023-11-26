import styles from "./page.module.css";
import Card from "./components/Card";
import Tabs from "./components/Tabs";

function Upcoming() {
  return (
    <div className={styles["home-cards"]}>
      <Card
        title="Foot Massage Upcoming 1"
        subtitle="Wed 8 October 2023, 12:00"
      />
      <Card
        title="Foot Massage Upcoming 2"
        subtitle="Wed 8 October 2023, 12:00"
      />
    </div>
  );
}

function Completed() {
  return (
    <div className={styles["home-cards"]}>
      <Card
        title="Foot Massage Completed"
        subtitle="Wed 8 October 2023, 12:00"
      />
    </div>
  );
}

export default function Home() {
  return (
    <section className="container">
      <h1>Welcome</h1>
      <p className={`subtitle ${styles["home-subtitle"]}`}>
        Browse and manage your massage bookings with ease.
      </p>
      <Tabs
        tabs={[
          { id: "tab-upcoming", title: "Upcoming", content: <Upcoming /> },
          { id: "tab-completed", title: "Completed", content: <Completed /> },
        ]}
      />
    </section>
  );
}
