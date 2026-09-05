import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ui/Toast';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';
import BookingReviewPage from '@/pages/BookingReviewPage';
import BookingPassengersPage from '@/pages/BookingPassengersPage';
import BookingExtrasPage from '@/pages/BookingExtrasPage';
import BookingPaymentPage from '@/pages/BookingPaymentPage';
import BookingConfirmationPage from '@/pages/BookingConfirmationPage';
import ManageBookingPage from '@/pages/ManageBookingPage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import ContactPage from '@/pages/ContactPage';
import FlightFreePage from '@/pages/FlightFreePage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/booking/review" element={<BookingReviewPage />} />
              <Route path="/booking/passengers" element={<BookingPassengersPage />} />
              <Route path="/booking/extras" element={<BookingExtrasPage />} />
              <Route path="/booking/payment" element={<BookingPaymentPage />} />
              <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
              <Route path="/manage-booking" element={<ManageBookingPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/flight-free" element={<FlightFreePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
