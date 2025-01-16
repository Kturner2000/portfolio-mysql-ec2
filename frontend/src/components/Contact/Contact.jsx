import { useState } from "react";
import styles from "./contact.module.css";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);

        try {
            console.log({ email, phone, name, message });
            setSuccessMessage("Your message has been sent successfully!");
            setEmail("");
            setPhone("");
            setName("");
            setMessage("");
        } catch (error) {
            console.error("Error submitting the form:", error);
            setSuccessMessage("There was an error sending your message. Please try again.");
        } finally {
            setPending(false);
        }
    };

    return (
        <div className={styles.page_container}>
            <div className={styles.form_container}>
                <div className={styles.form_header}>
                    <h1>Get in touch</h1>
                    <p>We'd love to hear from you</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.input_container}>
                        <label className={styles.form_label}>
                            <Mail /> <span>Email address</span>
                        </label>
                        <input
                            className={styles.form_input}
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label className={styles.form_label}>
                            <Phone /> <span>Phone number</span>
                        </label>
                        <input
                            className={styles.form_input}
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(123) 456-7890"
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label className={styles.form_label}>
                            <User /> <span>Name</span>
                        </label>
                        <input
                            className={styles.form_input}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label className={styles.form_label}>
                            <MessageSquare /> <span>Message</span>
                        </label>
                        <textarea
                            className={styles.form_textarea}
                            value={message}
                            required
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your message here..."
                        />
                    </div>

                    <button
                        className={styles.submit_button}
                        type="submit"
                        disabled={pending}
                    >
                        {pending ? (
                            <>
                                <Send className={styles.icon_spin} />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send />
                                Send Message
                            </>
                        )}
                    </button>

                    {successMessage && (
                        <div className={styles.success_message}>{successMessage}</div>
                    )}
                </form>
            </div>

            <div className={styles.image_container}>
                {/* Add an image or illustration here */}
            </div>
        </div>
    );
}
