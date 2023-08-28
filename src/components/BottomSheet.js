import React from 'react';
import Sheet from 'react-modal-sheet';

export default ({ isOpen, onClose, children }) => (
<>
    <Sheet isOpen={isOpen} detent="content-height" onClose={onClose}>
    <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
            {children}
        </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop />
    </Sheet>       
</>
);