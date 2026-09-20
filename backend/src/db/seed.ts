import { eq, sql } from 'drizzle-orm';
import { db } from '../config/db.js';
import { supabaseAdmin } from '../config/supabase.js';
import {
  users,
  priestProfiles,
  priestServices,
  addresses,
  pujaCatalog,
  bookings,
} from '../models/index.js';

interface SeedAccount {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'ADMIN' | 'USER' | 'PRIEST';
}

const SEED_ACCOUNTS: SeedAccount[] = [
  {
    name: 'Swastika Roy',
    email: 'admin@pujaCircle.com',
    password: 'admin@pujaCircle.com',
    phoneNumber: '9830000001',
    role: 'ADMIN',
  },
  {
    name: 'Arnab Roy',
    email: 'arnab@pujaCircle.com',
    password: 'arnab@pujaCircle.com',
    phoneNumber: '9830123456',
    role: 'USER',
  },
  {
    name: 'S. Chakraborty',
    email: 'schakra@pujaCircle.com',
    password: 'schakra@pujaCircle.com',
    phoneNumber: '9831987654',
    role: 'PRIEST',
  },
];

async function getOrCreateSupabaseUser(account: SeedAccount): Promise<string> {
  const { data: userList, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    throw new Error(`Failed to list Supabase users: ${listError.message}`);
  }

  const existing = userList.users.find(
    (u) => u.email?.toLowerCase() === account.email.toLowerCase()
  );

  if (existing) {
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(existing.id, {
      email: account.email,
      password: account.password,
      email_confirm: true,
      user_metadata: {
        name: account.name,
        phone: account.phoneNumber,
        role: account.role,
      },
    });

    if (updateError) {
      console.warn(`[Seed] Notice updating auth for ${account.email}: ${updateError.message}`);
    }

    return existing.id;
  }

  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: account.email,
    password: account.password,
    email_confirm: true,
    user_metadata: {
      name: account.name,
      phone: account.phoneNumber,
      role: account.role,
    },
  });

  if (createError || !created.user) {
    throw new Error(`Failed to create Supabase identity for ${account.email}: ${createError?.message}`);
  }

  return created.user.id;
}

export async function seedDatabase(): Promise<void> {
  console.log('\n============================================================');
  console.log('🌿 PujaCircle Realistic Database Seeding Initializing...');
  console.log('============================================================\n');

  // Ensure rating & review columns exist in PostgreSQL bookings table
  await db.execute(sql`
    ALTER TABLE bookings 
    ADD COLUMN IF NOT EXISTS rating integer,
    ADD COLUMN IF NOT EXISTS review text;
  `);

  // 1. Seed Supabase Auth & PostgreSQL Users
  const seededIds: Record<string, string> = {};

  for (const acc of SEED_ACCOUNTS) {
    const authId = await getOrCreateSupabaseUser(acc);
    seededIds[acc.role] = authId;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, authId))
      .limit(1);

    if (existingUser.length === 0) {
      await db.insert(users).values({
        id: authId,
        name: acc.name,
        email: acc.email,
        phoneNumber: acc.phoneNumber,
        role: acc.role,
        accountStatus: 'ACTIVE',
      });
      console.log(`✅ [User Created] ${acc.role}: ${acc.name} (${acc.email})`);
    } else {
      await db
        .update(users)
        .set({
          name: acc.name,
          email: acc.email,
          phoneNumber: acc.phoneNumber,
          role: acc.role,
          accountStatus: 'ACTIVE',
          updatedAt: new Date(),
        })
        .where(eq(users.id, authId));
      console.log(`🔄 [User Synchronized] ${acc.role}: ${acc.name} (${acc.email})`);
    }
  }

  // 2. Seed Default Kolkata Address for Devotee (Arnab Roy)
  const devoteeId = seededIds['USER'];
  let devoteeAddressId: string = '';

  if (devoteeId) {
    const existingAddress = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, devoteeId))
      .limit(1);

    if (existingAddress.length === 0) {
      const [newAddr] = await db
        .insert(addresses)
        .values({
          userId: devoteeId,
          houseNo: 'Flat 3B',
          houseBuilding: 'Lake View Residency',
          street: '42 Sarat Bose Road',
          locality: 'Southern Avenue',
          villageTown: 'Kolkata',
          city: 'Kolkata',
          district: 'Kolkata',
          state: 'West Bengal',
          pincode: '700029',
          isDefault: true,
        })
        .returning();
      devoteeAddressId = newAddr.id;
      console.log('✅ [Address Seeded] Kolkata residence linked to Arnab Roy (700029).');
    } else {
      devoteeAddressId = existingAddress[0].id;
      await db
        .update(addresses)
        .set({
          houseNo: 'Flat 3B',
          houseBuilding: 'Lake View Residency',
          street: '42 Sarat Bose Road',
          locality: 'Southern Avenue',
          villageTown: 'Kolkata',
          city: 'Kolkata',
          district: 'Kolkata',
          state: 'West Bengal',
          pincode: '700029',
          isDefault: true,
          updatedAt: new Date(),
        })
        .where(eq(addresses.userId, devoteeId));
      console.log('🔄 [Address Synchronized] Arnab Roy Kolkata residence verified.');
    }
  }

  // 3. Admin Creates Sacred Puja Catalog (Master Authoritative Ceremonies)
  console.log('\n🪔 [Admin Catalog] Initializing Authoritative Sacred Ceremonies...');

  const catalogDefinitions = [
    {
      name: 'Sri Satyanarayan Katha & Puja',
      deity: 'Lord Satyanarayan (Maha Vishnu)',
      category: 'life-event',
      description:
        'Sacred thanksgiving ritual performed on Purnima or auspicious family occasions for prosperity, harmony, and removal of obstacles.',
      intentTags: ['Prosperity', 'Family Peace', 'New Venture', 'Purnima'],
      samagriList: [
        'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)',
        'Banana Leaves & Stems',
        'Sacred Tulsi Dal',
        'Wheat flour & Semolina for Sinni Prasad',
        'Pure Desi Cow Ghee',
        'Supari & Betel Leaves',
        'Sacred Janeu & Red Moli Thread',
      ],
      steps: [
        'Ganesh-Gauri Sthapana',
        'Navagraha & Digpal Puja',
        'Sri Satyanarayan Katha Recitation (5 Adhyayas)',
        'Havan & Purnahuti',
        'Maha Aarti & Prasad Vitaran',
      ],
      timingNote:
        'Conducted during evening Godhuli Bela or morning of Ekadashi/Purnima (Duration: ~2 to 2.5 hours).',
      isActive: true,
    },
    {
      name: 'Vedic Griha Pravesh & Vastu Shanti',
      deity: 'Vastu Purusha & Lord Ganesha',
      category: 'life-event',
      description:
        'Traditional housewarming ceremony aligning cosmological energies in a new home, purifying spaces, and invoking Lakshmi-Narayan blessings.',
      intentTags: ['New Home', 'Vastu Shanti', 'Prosperity', 'Family Protection'],
      samagriList: [
        'Navagraha Samidha wood set',
        'Copper Kalash with Nariyal',
        'Pure Ganga Jal & Gomutra',
        'Havan Kund & Ghee',
        'Fresh Mango Leaves & Toran',
        'Panchratna & Vastu Yantra',
        'Pure Bhimseni Camphor',
      ],
      steps: [
        'Dwar Puja & Auspicious Threshold Crossing',
        'Boiling Milk Ceremony in East direction',
        'Ganesh-Gauri & Kalash Sthapana',
        'Navagraha & Vastu Mandala Puja',
        'Agni Hotra / Vastu Havan',
        'Purnahuti, Shanti Paath & Ashirwad',
      ],
      timingNote:
        'Conducted in early morning Brahma Muhurat or auspicious Shukla Paksha morning (Duration: ~3 to 3.5 hours).',
      isActive: true,
    },
    {
      name: 'Maha Durga Puja & Chandi Paath',
      deity: 'Maa Durga / Chandika',
      category: 'festival',
      description:
        'Auspicious recitation of Devi Mahatmyam and Chandi Havan invoking divine feminine protection, dispelling negativity, and granting spiritual victory.',
      intentTags: ['Protection', 'Navratri', 'Victory', 'Family Well-being'],
      samagriList: [
        'Red Chunri & Shringar Samagri',
        'Fresh Bilva Leaves (Bael Patra)',
        'Raktachandan & Sindoor',
        'Durga Saptashati Paath Samagri',
        'Dry Fruits & Panchameva',
        'Pure Cow Ghee for Havan',
      ],
      steps: [
        'Ghatasthapana & Sankalpa',
        'Devi Mahatmyam / Chandi Paath',
        'Kumari Puja & Suvasini Pujan',
        'Chandi Maha Yajna / Havan',
        'Pushpanjali & Dhunuchi Aarti',
      ],
      timingNote:
        'Performed during Sharadiya/Chaitra Navratri or auspicious Tuesdays/Fridays (Duration: ~4 hours).',
      isActive: true,
    },
    {
      name: 'Rudrabhishek & Shiva Aradhana',
      deity: 'Lord Shiva (Mahadev)',
      category: 'dosha-nivaran',
      description:
        'Powerful Vedic ritual of bathing the Shiva Lingam with 11 sacred dravyas accompanied by Sri Rudram chanting to dispel health afflictions and planetary doshas.',
      intentTags: ['Health', 'Longevity', 'Inner Peace', 'Maha Shivratri'],
      samagriList: [
        'Raw Cow Milk, Honey & Curd',
        'Fresh Sugarcane Juice (Ikshu Rasa)',
        'Pure Gangajal & Rose Water',
        'Bilva Leaves & Dhatura Flowers',
        'Vibhuti Bhasma & White Chandan',
      ],
      steps: [
        'Sankalpa & Laghu Nyasa',
        'Ekadasa Dravya Abhishekam',
        'Sri Rudra Trishati Chanting',
        'Bilva Archana with 108 Ashtottara',
        'Maha Mrityunjaya Japa & Aarti',
      ],
      timingNote:
        'Conducted on Mondays (Somwar), Pradosham, or Shivratri morning (Duration: ~2 to 2.5 hours).',
      isActive: true,
    },
  ];

  const catalogMap: Record<string, string> = {};

  for (const cat of catalogDefinitions) {
    const existing = await db
      .select()
      .from(pujaCatalog)
      .where(eq(pujaCatalog.name, cat.name))
      .limit(1);

    if (existing.length === 0) {
      const [inserted] = await db
        .insert(pujaCatalog)
        .values({
          name: cat.name,
          deity: cat.deity,
          category: cat.category,
          description: cat.description,
          intentTags: cat.intentTags,
          samagriList: cat.samagriList,
          steps: cat.steps,
          timingNote: cat.timingNote,
          isActive: true,
        })
        .returning();
      catalogMap[cat.name] = inserted.id;
      console.log(`✅ [Catalog Created] ${cat.name} (Category: ${cat.category})`);
    } else {
      catalogMap[cat.name] = existing[0].id;
      await db
        .update(pujaCatalog)
        .set({
          deity: cat.deity,
          category: cat.category,
          description: cat.description,
          intentTags: cat.intentTags,
          samagriList: cat.samagriList,
          steps: cat.steps,
          timingNote: cat.timingNote,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(pujaCatalog.id, existing[0].id));
      console.log(`🔄 [Catalog Synchronized] ${cat.name}`);
    }
  }

  // 4. Seed Verified Priest Profile for S. Chakraborty
  // Priest's specializations strictly reflect the Admin's catalog items!
  const priestId = seededIds['PRIEST'];
  let priestProfileId: string = '';

  if (priestId) {
    const priestSpecializations = [
      'Vedic Griha Pravesh & Vastu Shanti',
      'Sri Satyanarayan Katha & Puja',
      'Maha Durga Puja & Chandi Paath',
    ];

    const existingProfile = await db
      .select()
      .from(priestProfiles)
      .where(eq(priestProfiles.userId, priestId))
      .limit(1);

    if (existingProfile.length === 0) {
      const [newProfile] = await db
        .insert(priestProfiles)
        .values({
          userId: priestId,
          approvalStatus: 'APPROVED', // Verified Priest
          experienceYears: 15,
          bio: 'Tradition-guided Vedic Purohit from Kalighat offering authentic Vedic rituals and pujas across Greater Kolkata.',
          languages: ['Bengali', 'Sanskrit', 'Hindi'],
          specializations: priestSpecializations,
          serviceAreas: ['Kolkata', 'South 24 Parganas', 'Howrah'],
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700026',
          rating: '5.00', // Real 5-star rating from verified booking
          reviewCount: 1, // Exactly 1 verified booking & review from Arnab Roy
        })
        .returning();
      priestProfileId = newProfile.id;
      console.log('✅ [Priest Profile Seeded] S. Chakraborty verified with APPROVED status.');
    } else {
      priestProfileId = existingProfile[0].id;
      await db
        .update(priestProfiles)
        .set({
          approvalStatus: 'APPROVED',
          experienceYears: 15,
          bio: 'Tradition-guided Vedic Purohit from Kalighat offering authentic Vedic rituals and pujas across Greater Kolkata.',
          languages: ['Bengali', 'Sanskrit', 'Hindi'],
          specializations: priestSpecializations,
          serviceAreas: ['Kolkata', 'South 24 Parganas', 'Howrah'],
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700026',
          rating: '5.00',
          reviewCount: 1,
          updatedAt: new Date(),
        })
        .where(eq(priestProfiles.id, priestProfileId));
      console.log('🔄 [Priest Profile Synchronized] S. Chakraborty credentials & specializations updated.');
    }

    // 5. Seed Priest Services strictly mapped to Admin's Catalog
    const priestServicesList = [
      {
        catalogName: 'Vedic Griha Pravesh & Vastu Shanti',
        price: 3500,
        category: 'Auspicious',
        samagri: [
          'Navagraha Samidha',
          'Copper Kalash',
          'Ganga Jal',
          'Vastu Yantra',
          'Pure Ghee',
          'Bhimseni Camphor',
        ],
      },
      {
        catalogName: 'Sri Satyanarayan Katha & Puja',
        price: 2100,
        category: 'Household',
        samagri: [
          'Panchamrit',
          'Banana Leaves',
          'Sinni Prasad items',
          'Tulsi Dal',
          'Desi Ghee',
          'Janeu',
        ],
      },
      {
        catalogName: 'Maha Durga Puja & Chandi Paath',
        price: 5100,
        category: 'Festive',
        samagri: [
          'Red Chunri',
          'Bilva Patra',
          'Chandi Paath Samagri',
          'Sindoor',
          'Panchameva',
          'Pure Ghee',
        ],
      },
    ];

    // Clean existing services to maintain strict catalog linkage
    await db.delete(priestServices).where(eq(priestServices.priestId, priestProfileId));

    for (const s of priestServicesList) {
      const catalogId = catalogMap[s.catalogName];
      if (catalogId) {
        await db.insert(priestServices).values({
          priestId: priestProfileId,
          serviceName: s.catalogName,
          pujaCatalogId: catalogId, // Strict Foreign Key link to Admin Catalog
          isCustom: false,
          category: s.category,
          samagriList: s.samagri,
          price: s.price,
          isActive: true,
        });
        console.log(`✅ [Priest Service Linked] "${s.catalogName}" linked to Admin Catalog ID (${s.price} ₹).`);
      }
    }
  }

  // 6. Seed Realistic Completed Booking & Real Review
  // User (Arnab Roy) booked Priest (S. Chakraborty) for Griha Pravesh at Lake View Residency
  if (devoteeId && priestProfileId && devoteeAddressId) {
    const grihaPraveshCatalogId = catalogMap['Vedic Griha Pravesh & Vastu Shanti'];

    // Clean previous bookings for this user to maintain a pristine history
    await db.delete(bookings).where(eq(bookings.userId, devoteeId));

    const scheduledDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

    const realReviewText =
      'Pandit S. Chakraborty conducted our Griha Pravesh with utter purity and profound Vedic precision. ' +
      'He arrived at our Sarat Bose Road home punctually with all auspicious samagri, explained every mantra so patiently ' +
      'to our family, and the Vastu Homa brought immense peace and divine vibrations. ' +
      'We will definitely seek his blessings for all future pujas in our household.';

    await db.insert(bookings).values({
      userId: devoteeId,
      priestId: priestProfileId,
      pujaCatalogId: grihaPraveshCatalogId,
      addressId: devoteeAddressId,
      status: 'COMPLETED',
      scheduledDate,
      totalPrice: 3500,
      notes:
        'Griha Pravesh ceremony for our new residence Flat 3B, Lake View Residency. ' +
        'Requested early morning sunrise muhurat with extended family.',
      rating: 5,
      review: realReviewText,
    });

    console.log('\n📜 [Realistic Booking Seeded]');
    console.log('   Devotee:      Arnab Roy (Flat 3B, Lake View Residency, Sarat Bose Road)');
    console.log('   Priest:       S. Chakraborty (Kalighat, Kolkata)');
    console.log('   Puja:         Vedic Griha Pravesh & Vastu Shanti (Admin Catalog Linked)');
    console.log('   Status:       COMPLETED (3 days ago)');
    console.log('   Amount:       ₹3,500 (Paid Offline)');
    console.log('   Rating:       ⭐⭐⭐⭐⭐ (5/5 Stars)');
    console.log(`   Review:       "${realReviewText}"`);
  }

  console.log('\n============================================================');
  console.log('✨ PujaCircle Database Seeding Completed with Realistic Data!');
  console.log('============================================================');
  console.log('1. Admin:   admin@pujaCircle.com   / admin@pujaCircle.com');
  console.log('2. Devotee: arnab@pujaCircle.com   / arnab@pujaCircle.com');
  console.log('3. Priest:  schakra@pujaCircle.com / schakra@pujaCircle.com (APPROVED)');
  console.log('============================================================\n');
}

// Allow direct CLI execution
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}
