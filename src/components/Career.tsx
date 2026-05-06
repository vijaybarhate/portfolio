import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Certifications
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {[
            {
              title: "B.E. Computer Engineering",
              issuer: "Saraswati College of Engineering, Kharghar (Mumbai Univ.)",
              date: "2023 – 2027",
              desc: "Expected Graduation in 2027"
            },
            {
              title: "Class XII – CBSE",
              issuer: "Ambuja Vidya Niketan, Chandrapur",
              date: "2023",
              desc: "Score: 69.4% | CS: 89/100"
            },
            {
              title: "Class X – CBSE",
              issuer: "Manikgarh Cement English School, Gadchandur",
              date: "2021",
              desc: "Score: 81.8%"
            },
            {
              title: "Generative AI Certification",
              issuer: "EduBridge (Capgemini × SAP × NSDC)",
              date: "Feb 2026",
              desc: "Certified in Generative AI technologies and applications."
            },
            {
              title: "Generative AI Mastery Workshop",
              issuer: "OpenAI Academy × NxtWave",
              date: "Sep 2025",
              desc: "Workshop covering advanced generative AI techniques."
            },
            {
              title: "Software Engineering Job Simulation",
              issuer: "Accenture via Forage",
              date: "Jun 2025",
              desc: "Covered Architecture, Security, Programming, Testing, and Agile."
            },
            {
              title: "Python Basics to Brilliance Masterclass",
              issuer: "Ethan's Tech Solutions",
              date: "Apr 2025",
              desc: "Masterclass focusing on Python programming excellence."
            },
            {
              title: "AI for Students: Build Generative AI Model",
              issuer: "NxtWave",
              date: "Dec 2024",
              desc: "Hands-on project building generative AI models."
            },
            {
              title: "Machine Learning Training",
              issuer: "Acmegrade × IIT Bombay Mood Indigo",
              date: "Oct 2024",
              desc: "Comprehensive ML training program."
            },
            {
              title: "Alpha (DSA with Java)",
              issuer: "Apna College",
              date: "2023",
              desc: "Data Structures and Algorithms focused course using Java."
            }
          ].map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.title}</h4>
                  <h5>{item.issuer}</h5>
                </div>
                <h3>{item.date}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
