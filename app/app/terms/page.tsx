
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";


export default function Home() {

  
  

  return (
    <>
      <Navbar /> <main className="max-w-4xl m-28 mx-auto">
        <h1 className="text-4xl font-bold text-center my-6">
          Terms of Service
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="mt-2 text-base">
              By accessing Rekruit, users agree to these terms and conditions.
              Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Services Offered</h2>
            <p className="mt-2 text-base">
              Rekruit provides a platform to connect recruiters with potential
              job opportunities, including access to recruiter emails, LinkedIn
              profiles, and email templates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Use of Data</h2>
            <p className="mt-2 text-base">
              Users consent to the collection and use of recruiter emails and
              LinkedIn profiles solely for the purpose of job recruitment and
              communication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. User Obligations</h2>
            <p className="mt-2 text-base">
              Users agree to use the email templates and advanced search
              algorithm responsibly and ethically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              5. Modifications to Service
            </h2>
            <p className="mt-2 text-base">
              Rekruit reserves the right to modify or discontinue the service
              with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Termination</h2>
            <p className="mt-2 text-base">
              The service may terminate your access for any breach of these
              terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
