import { useState } from 'react';

// Bootstrap 4 accordion markup, toggled with React (no Bootstrap JS): one item open at a time
export default function Accordion({ id, items }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="accordion" id={id}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div className="card" key={index}>
                        <div className="card-header p-0" id={`${id}-heading-${index}`}>
                            <h5 className="mb-0">
                                <button
                                    className={`btn btn-link btn-block text-left py-3 px-4 ${isOpen ? '' : 'collapsed'}`}
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen ? 'true' : 'false'}
                                    aria-controls={`${id}-collapse-${index}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {item.title}
                                </button>
                            </h5>
                        </div>
                        <div
                            id={`${id}-collapse-${index}`}
                            className={`collapse ${isOpen ? 'show' : ''}`}
                            role="region"
                            aria-labelledby={`${id}-heading-${index}`}
                        >
                            <div className="card-body">
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
