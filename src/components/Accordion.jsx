import React from 'react';

export default function Accordion({ id, items }) {
    return (
        <div className="accordion" id={id}>
            {items.map((item, index) => (
                <div className="card" key={index}>
                    <div className="card-header p-0" id={`${id}-heading-${index}`}>
                        <h5 className="mb-0">
                            <button
                                className={`btn btn-link btn-block text-left py-3 px-4 ${index === 0 ? '' : 'collapsed'}`}
                                type="button"
                                data-toggle="collapse"
                                data-target={`#${id}-collapse-${index}`}
                                aria-expanded={index === 0 ? 'true' : 'false'}
                                aria-controls={`${id}-collapse-${index}`}
                                style={{ textDecoration: 'none' }}
                            >
                                {item.title}
                            </button>
                        </h5>
                    </div>
                    <div
                        id={`${id}-collapse-${index}`}
                        className={`collapse ${index === 0 ? 'show' : ''}`}
                        aria-labelledby={`${id}-heading-${index}`}
                        data-parent={`#${id}`}
                    >
                        <div className="card-body">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
