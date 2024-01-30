import styles from "./index.module.css";
import { unstable_noStore as noStore } from "next/cache";
import { RaribleSdkShowcase } from "./rarible-showcase";
export default async function Home() {
  noStore();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <RaribleSdkShowcase />
      </div>
    </main>
  );
}
