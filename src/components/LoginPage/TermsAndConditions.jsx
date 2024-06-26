// src/components/LoginPage/TermsAndConditions.jsx
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const TermsAndConditions = ({ open, handleClose, setOpen }) => {
  return (
    <>
      <style>
        {`
          .contact-link {
            text-decoration: none;
            color: inherit;
          }

          .contact-link:hover {
            text-decoration: underline;
            color: #007bff; /* Change to desired hover color */
          }
        `}
      </style>
      <ClickAwayListener onClickAway={() => setOpen(true)}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            {"Terms and Conditions"}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText component="div" id="alert-dialog-description">
              <p>
                Welcome to PlayItForward! By using our Application, you agree to
                these Terms. Please read them carefully.
              </p>
              <ul>
                <li>
                  User Eligibility: You must be at least 18 years old to use the
                  Application. By using it, you confirm your legal capacity to
                  agree to these Terms.
                </li>
                <li>
                  Use of the Application: Our Application facilitates toy
                  sharing and exchange among users. Use it responsibly and in
                  accordance with these Terms.
                </li>
                <li>
                  Registration and Account: Create an account to access
                  features. Provide accurate information during registration.
                </li>
                <li>
                  User Content: You're responsible for content you upload. We
                  have a license to use and distribute it.
                </li>
                <li>
                  Toy Listings and Transactions: Users can list toys for
                  sharing. We're not liable for toy quality or legality.
                </li>
                <li>
                  Prohibited Conduct: Don't violate these Terms or harm others.
                </li>
                <li>
                  Intellectual Property: All rights to the Application belong to
                  us. Use it for personal, non-commercial purposes.
                </li>
                <li>Privacy: Review our Privacy Policy for data handling.</li>
                <li>
                  Disclaimer of Warranties: The Application is provided "as is."
                </li>
                <li>
                  Limitation of Liability: We're not liable for indirect
                  damages.
                </li>
                <li>Indemnification: You agree to indemnify us from claims.</li>
                <li>
                  Modification of Terms: We may update Terms; your continued use
                  implies acceptance.
                </li>
                <li>Termination: We can suspend or terminate your access.</li>
                <li>Governing Law: Governed by the United States laws.</li>
                <li>
                  Dispute Resolution: Disputes resolved through arbitration.
                </li>
                <li>
                  Contact Us: Questions?{" "}
                  <a
                    href="https://notion.so/61c6b79808ce476290c753165851b070"
                    className="contact-link"
                  >
                    Contact us
                  </a>
                  . By using our Application, you agree to these Terms. Enjoy
                  using PlayItForward!
                </li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Disagree</Button>
            <Button onClick={() => handleClose(true)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ClickAwayListener>
    </>
  );
};

export default TermsAndConditions;
