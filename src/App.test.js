import { render, screen } from '@testing-library/react';
import Popup from './popup/Popup';
import { APP_INITIAL_POPUP_MSG } from './utility/constants';

//clear local storage
beforeEach(() => {
    localStorage.clear();
});

describe('App component', () => {
    test('renders popup with image, message, and button', () => {
        const mockSetShowPopup = jest.fn(); //mock function
    
        // Render the Popup component
        render(<Popup setShowPopup={mockSetShowPopup} />);
    
        const popupImage = screen.getByRole('img');
        expect(popupImage).toBeInTheDocument();
        expect(popupImage).toHaveAttribute('src','favicon1.ico');
    
        const message = screen.getByText(APP_INITIAL_POPUP_MSG);
        expect(message).toBeInTheDocument();
    
        //check ok button
        const button = screen.getByRole('button',{name:/OK/i});
        expect(button).toBeInTheDocument();
      });
})