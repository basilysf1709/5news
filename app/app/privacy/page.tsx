
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";


export default function Home() {

  
  

  return (
    <>
      <Navbar />
      <main className="max-w-4xl m-28 mx-auto">
        <h1 className="text-4xl font-bold text-center my-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">
              1. Information Collection
            </h2>
            <p className="mt-2 text-base">
              We collect recruiter emails and LinkedIn profiles with the users
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Use of Information</h2>
            <p className="mt-2 text-base">
              The information collected is used to facilitate recruitment
              processes and provide tailored job opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              3. Data Storage and Security
            </h2>
            <p className="mt-2 text-base">
              We implement security measures to protect your data and will store
              it only as long as necessary for our service provision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. User Rights</h2>
            <p className="mt-2 text-base">
              Users have the right to access, modify, or delete their data upon
              request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Compliance with Laws</h2>
            <p className="mt-2 text-base">
              We comply with applicable laws and regulations concerning data
              protection and will respond to lawful requests for information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Changes to Policy</h2>
            <p className="mt-2 text-base">
              We may update this policy and will notify users of significant
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
            <p className="mt-2 text-base">
              For any questions or concerns about these terms or privacy
              policies, please contact us at [Your Contact Information].
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
