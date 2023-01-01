import React from "react";
import Footer from "../../Components/Footer/Footer";
import MainNav from "../../Components/Navbar/MainNav";
import Title from "../../Components/Seo/Title";

const Grievance = () => {
  return (
    <>
      <Title />
      <MainNav />
      <div
        style={{ textDecoration: "dotted underline var(--red-color)" }}
        className="text-center h3 fw-bold my-3 mt-5 text-uppercase"
      >
        Grievance
      </div>
      <br />
      <div
        style={{ height: "fit-content", textTransform: "none" }}
        className="text-justify container"
      >
        <span className=" fw-bold text-danger text-decoration-underline">
          പരാതി പരിഹാരം:
        </span>
        <br />
        <br />
        കോഡ് ഓഫ് എത്തിക്സ് ആൻഡ് ബ്രോഡ്കാസ്റ്റിംഗ് സ്റ്റാൻഡേർഡ് (തർക്കപരിഹാരം
        )പ്രകാരം വീസ്‌ക്വയർ ഡിജിറ്റൽ വേൾഡിന്റെ ഉടമസ്ഥതയിൽ ഉള്ള കൊട്ടാരക്കര
        മീഡിയയുടെ (www.kottarakaramedia.com) ഏതെങ്കിലും ഉള്ളടക്കവുമായി
        ബന്ധപ്പെട്ടുള്ള പരാതികൾ അതുമായി ബന്ധപ്പെട്ടവർക്ക്
        സമർപ്പിക്കാം.സംപ്രേഷണ/പ്രസിദ്ധീകരണ തീയതി മുതൽ ഏഴു ദിവസത്തിനകം വീസ്‌ക്വയർ
        ഡിജിറ്റൽ ഇതിനുവേണ്ടി അധികാരപ്പെടുത്തിയ ആൾക്കാണ് പരാതി നൽകേണ്ടത്. പരാതികൾ
        അയക്കേണ്ട വിലാസം.
        <br />
        <div style={{ width: "310px" }}>
          <br />
          <code>
            വിനോദ് അലക്സാണ്ടർ ചീഫ് എഡിറ്റർ , കൊട്ടാരക്കര മീഡിയ <br /> ഫോൺ:
            9961454976 <br />
            ഇമെയിൽ: Kottarakaramedia@gmail.com
          </code>
        </div>
      </div>
      <br />
      <div
        style={{ height: "fit-content", textTransform: "none" }}
        className="text-justify container"
      >
        <span className=" fw-bold text-danger text-decoration-underline">
          Complaint resolution :
        </span>
        <br />
        <br />
        According to the Code of Ethics and Broadcasting Standards (Dispute
        Resolution) Complaints about news/events published by Kottarakara Media
        (www.kottarakaramedia.com)under Vsquare Digital World can be submitted
        to those concerned.The Complaint should be loadged with the person
        authorized by V Square Digital World within 7 (seven) days from the date
        of transmission.Address to which complaints should be sent.
        <br />
        <div style={{ width: "310px" }}>
          <br />
          <code>
            Mr.Vinod Alexander Chief Editor,
            <br />
            Vsquare TV, <br /> Phone:9961454976,
            <br /> Email:Kottarakaramedia@gmail.com
          </code>
        </div>
        <br />
        Before sending complaints,it is advisable for complainants to check the
        details of the Code of Ethics and Broadcasting statements and news
        broadcasting standards and regulations.
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Grievance;
