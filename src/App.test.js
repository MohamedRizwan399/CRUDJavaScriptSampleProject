import { render, screen } from '@testing-library/react';
import Popup from './popup/Popup';

//clear local storage
beforeEach(() => {
    localStorage.clear();
});

describe("popup component", () => {
    test("renders popup with image, message, and button", () => {
        const mockSetShowPopup = jest.fn(); //mock function
    
        // Render the Popup component
        render(<Popup setShowPopup={mockSetShowPopup} />);
    
        const popupImage = screen.getByRole('img');
        expect(popupImage).toBeInTheDocument();
        expect(popupImage).toHaveAttribute('src','favicon1.ico');
    
        const boldText1 = document.querySelector('b');
        expect(boldText1).toBeInTheDocument();
        expect(boldText1.textContent).toBe('myself');
    
        //check ok button
        const button = screen.getByRole('button',{name:/OK/i});
        expect(button).toBeInTheDocument();
      });
})