import { useRef } from 'react';
import 'foliate-js/view.js'; // Make sure this import path matches your setup

const BasicEpubReader = () => {
    const fileInputRef = useRef(null);
    const foliateRef = useRef(null);

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await customElements.whenDefined('foliate-view');
        foliateRef.current.open(file); // Note: foliate-view implements .open()
        foliateRef.current.goTo(); 
    };

    return (
        <div>
            <input
                type="file"
                accept=".epub"
                ref={fileInputRef}
                onChange={handleFile}
            />
            <foliate-view
                ref={foliateRef}
                style={{ display: 'block', width: 600, height: 800, margin: '2em auto', border: '1px solid #ccc' }}
            />
        </div>
    );
};

export default BasicEpubReader;
