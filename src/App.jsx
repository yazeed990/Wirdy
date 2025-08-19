import Grid from "./components/Grid";
import Layout from "./components/Layout";
import ProgramSection from "./components/ProgramSection.jsx";
import QuickActions from "./components/QuickActions.jsx";
import Achievements from "./components/Achievements.jsx";
import Methodology from "./components/Methodology.jsx";

function App() {
  return (
    <Layout>
      <main className="app-main">
        <div className="container">
          {/* Quick Start Section */}
          <section className="app-section">
            <QuickActions
              onOpenToday={() => {
                const evt = new CustomEvent("open-workout-request");
                window.dispatchEvent(evt);
              }}
            />
          </section>

          {/* Progress Overview */}
          <section className="app-section">
            <Achievements />
          </section>

          {/* Program Management */}
          <section className="app-section">
            <ProgramSection />
          </section>

          {/* Methodology */}
          <section className="app-section" id="Ways">
            <div className="section-header">
              <h2 className="section-title">منهجية الحفظ</h2>
              <p className="section-description">
                تعرف على الطرق المختلفة لحفظ القرآن الكريم
              </p>
            </div>
            <Methodology />
          </section>

          {/* Training Days Grid */}
          <section className="app-section">
            <div className="section-header">
              <h2 className="section-title">جدول الأيام التدريبية</h2>
              <p className="section-description">
                اختر اليوم الذي تريد البدء فيه أو استكمال تقدمك
              </p>
            </div>
            <Grid />
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default App;
