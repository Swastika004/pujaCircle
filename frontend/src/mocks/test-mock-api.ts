/**
 * PujaCircle - Mock API & Domain Logic Verification Suite
 * Executes end-to-end verification of mock storage, state transitions,
 * business constraints, validation boundaries, and admin workflows.
 */

import {
  mockLookupPincode,
  mockGetAddresses,
  mockCreateAddress,
  mockGetPriests,
  mockGetPriestById,
  mockGetRituals,
  mockCreateAvailabilitySlot,
  mockGetAvailableSlotsForDate,
  mockCreateBooking,
  mockAcceptBooking,
  mockCompleteBooking,
  mockCancelBooking,
  mockSubmitRating,
  mockAdminGetDashboardStats,
  mockAdminApprovePriest,
  mockAdminBanPriest,
  mockAdminUnbanPriest,
  mockAdminBanUser,
  mockAdminUnbanUser,
} from './mock-api';
import { mockDb } from './data';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`✅ PASS: ${message}`);
}

async function runMockTestSuite() {
  console.log('====================================================');
  console.log('🕉️  PUJACIRCLE - MOCK SYSTEM VERIFICATION SUITE');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // SUITE 1: Postal Directory & Pincode Resolution
  // ----------------------------------------------------
  console.log('📦 [1/6] Testing Postal Pincode Directory & Resolution...');
  const validPincode = await mockLookupPincode('700029');
  assert(validPincode.locations.length > 0, 'Pincode 700029 resolved to locations');
  assert(validPincode.locations[0].city === 'Kolkata', 'Resolved city is Kolkata');
  assert(validPincode.locations[0].state === 'West Bengal', 'Resolved state is West Bengal');

  const invalidPincode = await mockLookupPincode('000123');
  assert(invalidPincode.locations.length === 0, 'Invalid pincode 000123 correctly returns empty locations');

  // ----------------------------------------------------
  // SUITE 2: Address Book Management & Constraints
  // ----------------------------------------------------
  console.log('\n🏠 [2/6] Testing Address Book Operations & Constraints...');
  // 2a. Max 2 addresses boundary enforcement
  const user1Addresses = await mockGetAddresses('user-devotee-1');
  assert(user1Addresses.success && user1Addresses.data.length === 2, 'user-devotee-1 has reached 2 addresses limit');

  const thirdAddressAttempt = await mockCreateAddress('user-devotee-1', {
    label: 'OTHER',
    recipientName: 'Debabrata Banerjee',
    phoneNumber: '+919876543210',
    houseNo: 'Flat 402',
    villageTown: 'Kolkata',
    pincode: '700029',
    city: 'Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    isDefault: false,
  });
  assert(thirdAddressAttempt.success === false, 'Strict maximum 2 addresses rule correctly enforced');

  // 2b. Add address for user with 1 address (user-devotee-3)
  const user3AddressesBefore = await mockGetAddresses('user-devotee-3');
  assert(user3AddressesBefore.data.length === 1, 'user-devotee-3 currently has 1 address');

  const user3NewAddress = await mockCreateAddress('user-devotee-3', {
    label: 'OFFICE',
    recipientName: 'Subrata Mukherjee',
    phoneNumber: '+919822334455',
    houseNo: 'Floor 3, Tech Park',
    villageTown: 'Kolkata',
    pincode: '700091',
    city: 'Kolkata',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    country: 'India',
    isDefault: false,
  });
  assert(user3NewAddress.success === true && !!user3NewAddress.data?.id, 'Successfully added 2nd address for user-devotee-3');

  // ----------------------------------------------------
  // SUITE 3: Priest Catalog & Filtering
  // ----------------------------------------------------
  console.log('\n🪔 [3/6] Testing Priest Discovery & Catalog...');
  const allPriestsRes = await mockGetPriests();
  assert(allPriestsRes.success && allPriestsRes.data.length > 0, 'Priest catalog returns verified priests');

  const ritualsRes = await mockGetRituals();
  assert(ritualsRes.success && ritualsRes.data.length > 0, 'Rituals catalog loaded with Vedic ceremonies');

  const priest1 = await mockGetPriestById('priest-1');
  assert(priest1.success && priest1.data?.id === 'priest-1', 'Retrieved priest-1 profile details');

  // ----------------------------------------------------
  // SUITE 4: Availability Slots & Booking Lifecycle State Machine
  // ----------------------------------------------------
  console.log('\n⏳ [4/6] Testing Booking Lifecycle & State Transitions...');
  const today = new Date();
  const futureDate1 = new Date(today.getTime() + 10 * 86400000).toISOString().split('T')[0];
  const futureDate2 = new Date(today.getTime() + 11 * 86400000).toISOString().split('T')[0];

  const slotRes = await mockCreateAvailabilitySlot('priest-1', {
    slotDate: futureDate1,
    startTime: '08:00',
    endTime: '10:30',
  });
  assert(slotRes.success === true && !!slotRes.data?.id, 'Created new availability slot for priest-1');
  const createdSlotId = slotRes.data!.id;

  const availableSlots = await mockGetAvailableSlotsForDate('priest-1', futureDate1);
  const foundSlot = availableSlots.data?.find((s) => s.id === createdSlotId);
  assert(foundSlot !== undefined && foundSlot.status === 'AVAILABLE', 'Slot is available for booking');

  // 4a. Create Booking with locked price snapshot
  const bookingRes = await mockCreateBooking('user-devotee-1', {
    priestId: 'priest-1',
    priestServiceId: 'service-1',
    slotId: createdSlotId,
    addressId: 'address-1',
    bookingDate: futureDate1,
    startTime: '08:00',
    endTime: '10:30',
    specialInstructions: 'Please bring sacred Ganga jal.',
  });
  assert(bookingRes.success === true && !!bookingRes.data?.id, 'Booking created in PENDING status');
  const bookingId = bookingRes.data!.id;
  assert(bookingRes.data!.status === 'PENDING', 'Booking initial state is PENDING');
  assert(bookingRes.data!.paymentMethod === 'OFFLINE_CASH', 'Payment method is strictly OFFLINE_CASH');
  assert(bookingRes.data!.servicePrice > 0, 'Authoritative price snapshot locked');

  // 4b. Priest accepts booking -> CONFIRMED
  const acceptRes = await mockAcceptBooking(bookingId, 'priest-1');
  assert(acceptRes.success && acceptRes.data?.status === 'CONFIRMED', 'Priest accepted booking -> status CONFIRMED');

  // 4c. Priest completes booking -> COMPLETED
  const completeRes = await mockCompleteBooking(bookingId, 'priest-1');
  assert(completeRes.success && completeRes.data?.status === 'COMPLETED', 'Priest completed booking -> status COMPLETED');

  // 4d. Verified 5-Star Rating submission
  const ratingRes = await mockSubmitRating('user-devotee-1', {
    bookingId: bookingId,
    rating: 5,
    review: 'Most authentic Vedic chanting and punctual arrival!',
  });
  assert(ratingRes.success === true && ratingRes.data?.rating === 5, 'Devotee submitted verified 5-star rating');

  // 4e. Duplicate rating rejection
  const dupRatingRes = await mockSubmitRating('user-devotee-1', {
    bookingId: bookingId,
    rating: 4,
  });
  assert(dupRatingRes.success === false, 'Duplicate rating on same completed ceremony rejected');

  // 4f. Test Cancellation on a second slot
  const slot2Res = await mockCreateAvailabilitySlot('priest-1', {
    slotDate: futureDate2,
    startTime: '11:00',
    endTime: '13:00',
  });
  const booking2Res = await mockCreateBooking('user-devotee-1', {
    priestId: 'priest-1',
    priestServiceId: 'service-1',
    slotId: slot2Res.data!.id,
    addressId: 'address-1',
    bookingDate: futureDate2,
    startTime: '11:00',
    endTime: '13:00',
  });
  const cancelRes = await mockCancelBooking(booking2Res.data!.id, 'user-devotee-1', 'Family travel schedule change');
  assert(cancelRes.success && cancelRes.data?.status === 'CANCELLED', 'Devotee cancelled booking -> status CANCELLED');

  // ----------------------------------------------------
  // SUITE 5: Administrator Moderation & Decoupled State
  // ----------------------------------------------------
  console.log('\n🛡️  [5/6] Testing Administrator Moderation & Decoupled Status...');
  const approveRes = await mockAdminApprovePriest('priest-3');
  assert(approveRes.success, 'Admin approved pending priest application');

  const banPriestRes = await mockAdminBanPriest('priest-3', 'Regulatory credential non-compliance');
  assert(banPriestRes.success, 'Admin banned priest for policy violation');
  const bannedPriest = mockDb.priests.find((p) => p.id === 'priest-3');
  assert(bannedPriest?.accountStatus === 'BANNED', 'Priest accountStatus is BANNED');

  const unbanPriestRes = await mockAdminUnbanPriest('priest-3');
  assert(unbanPriestRes.success, 'Admin restored priest account to ACTIVE');

  const banUserRes = await mockAdminBanUser('user-devotee-2', 'Spamming booking requests');
  assert(banUserRes.success, 'Admin suspended user account');
  const bannedUser = mockDb.users.find((u) => u.id === 'user-devotee-2');
  assert(bannedUser?.accountStatus === 'BANNED', 'User accountStatus is BANNED');

  const unbanUserRes = await mockAdminUnbanUser('user-devotee-2');
  assert(unbanUserRes.success, 'Admin restored user account to ACTIVE');

  // ----------------------------------------------------
  // SUITE 6: Platform Metrics & KPIs
  // ----------------------------------------------------
  console.log('\n📊 [6/6] Testing Admin Dashboard Metrics & Analytics...');
  const stats = await mockAdminGetDashboardStats();
  assert(stats.totalPriests > 0, 'Admin metrics report total registered priests');
  assert(stats.totalBookings > 0, 'Admin metrics report total bookings');
  assert(typeof stats.completedCashAmountRecorded === 'number', 'Cash dakshina volume calculated');

  console.log('\n====================================================');
  console.log(`🎉 ALL ${passedTests}/${totalTests} MOCK SYSTEM TESTS PASSED SUCCESSFULLY!`);
  console.log('====================================================\n');
}

runMockTestSuite().catch((error) => {
  console.error('\n❌ Mock test suite failed with error:\n', error);
  process.exit(1);
});
