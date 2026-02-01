import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function NewsletterModal() {
    const { t } = useLanguage();
    const [showModal, setShowModal] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const isDismissed = localStorage.getItem('newsletter_dismissed');
        if (isDismissed) {
            setDismissed(true);
            return;
        }

        const timer = setTimeout(() => {
            setShowModal(true);
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowModal(false);
        localStorage.setItem('newsletter_dismissed', 'true');
        setDismissed(true);
    };

    if (!showModal || dismissed) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1050,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                position: 'relative',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    &times;
                </button>

                <div className="text-center mb-4">
                    <h3 className="font-weight-bold mb-3">Déjanos tus datos para no perderte nada</h3>
                    <p className="mb-4">
                        ...o ¡ven a conocernos!<br />
                        Estamos en Carrer Sant Pere Claver, 1, Lleida.<br />
                        ¡Te esperamos con los tableros preparados para jugar!
                    </p>
                </div>

                <form action="https://formsubmit.co/escacspardinyes@gmail.com" method="POST">
                    <input type="hidden" name="_subject" value="Nova Subscripció Newsletter" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="form-group mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-right-0"><i className="fa fa-user"></i></span>
                            </div>
                            <input type="text" name="name" className="form-control border-left-0" placeholder="Nombre" required />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-right-0"><i className="fa fa-phone"></i></span>
                            </div>
                            <input type="tel" name="phone" className="form-control border-left-0" placeholder="Teléfono" required />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-right-0"><i className="fa fa-envelope"></i></span>
                            </div>
                            <input type="email" name="email" className="form-control border-left-0" placeholder="E-mail" required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block text-white font-weight-bold py-2">
                        Enviar <i className="fa fa-arrow-right ml-2"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}
