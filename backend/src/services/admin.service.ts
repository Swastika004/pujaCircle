import { count, eq, sql } from 'drizzle-orm';
import { db } from '../config/db.js';
import { users, priestProfiles, bookings } from '../models/index.js';

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalPriests: number;
    approvedPriests: number;
    pendingPriests: number;
    totalBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    revenueEstimate: number;
}

export class AdminService {
    // Aggregate platform KPIs and statistics
    async getDashboardStats(): Promise<DashboardStats> {
        const [
            [userStats],
            [activeUserStats],
            [priestStats],
            [approvedPriestStats],
            [pendingPriestStats],
            [bookingStats],
            [confirmedBookingStats],
            [completedBookingStats],
            [revenueStats],
        ] = await Promise.all([
            db.select({ value: count() }).from(users).where(eq(users.role, 'USER')),
            db.select({ value: count() }).from(users).where(sql`${users.role} = 'USER' AND ${users.accountStatus} = 'ACTIVE'`),
            db.select({ value: count() }).from(priestProfiles),
            db.select({ value: count() }).from(priestProfiles).where(eq(priestProfiles.approvalStatus, 'APPROVED')),
            db.select({ value: count() }).from(priestProfiles).where(eq(priestProfiles.approvalStatus, 'PENDING')),
            db.select({ value: count() }).from(bookings),
            db.select({ value: count() }).from(bookings).where(eq(bookings.status, 'CONFIRMED')),
            db.select({ value: count() }).from(bookings).where(eq(bookings.status, 'COMPLETED')),
            db.select({ total: sql<number>`COALESCE(SUM(${bookings.totalPrice}), 0)` }).from(bookings).where(eq(bookings.status, 'COMPLETED')),
        ]);

        return {
            totalUsers: Number(userStats?.value ?? 0),
            activeUsers: Number(activeUserStats?.value ?? 0),
            totalPriests: Number(priestStats?.value ?? 0),
            approvedPriests: Number(approvedPriestStats?.value ?? 0),
            pendingPriests: Number(pendingPriestStats?.value ?? 0),
            totalBookings: Number(bookingStats?.value ?? 0),
            confirmedBookings: Number(confirmedBookingStats?.value ?? 0),
            completedBookings: Number(completedBookingStats?.value ?? 0),
            revenueEstimate: Number(revenueStats?.total ?? 0),
        };
    }

    // Get all priests joined with user information
    async getAllPriests() {
        const records = await db
            .select({
                id: priestProfiles.id,
                userId: users.id,
                fullName: users.name,
                displayName: users.name,
                phoneNumber: users.phoneNumber,
                email: users.email,
                approvalStatus: priestProfiles.approvalStatus,
                accountStatus: users.accountStatus,
                banReason: users.banReason,
                rejectionReason: priestProfiles.rejectionReason,
                experienceYears: priestProfiles.experienceYears,
                bio: priestProfiles.bio,
                languages: priestProfiles.languages,
                specializations: priestProfiles.specializations,
                serviceAreas: priestProfiles.serviceAreas,
                city: priestProfiles.city,
                state: priestProfiles.state,
                profileImageUrl: priestProfiles.profileImageUrl,
                rating: priestProfiles.rating,
                reviewCount: priestProfiles.reviewCount,
                createdAt: priestProfiles.createdAt,
            })
            .from(priestProfiles)
            .innerJoin(users, eq(priestProfiles.userId, users.id));

        return records.map((p) => ({
            ...p,
            isPhoneVerified: true,
            rating: Number(p.rating || 0),
            createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
        }));
    }

    // Ban priest account by priestProfile id
    async banPriest(priestId: string, reason?: string) {
        // 1. Find the priest profile to get the user ID
        const [priest] = await db
            .select({ userId: priestProfiles.userId })
            .from(priestProfiles)
            .where(eq(priestProfiles.id, priestId))
            .limit(1);

        if (!priest) {
            throw { statusCode: 404, message: 'Priest record not found.' };
        }

        // 2. Set account status to BANNED on the user record
        await db
            .update(users)
            .set({
                accountStatus: 'BANNED',
                banReason: reason || 'Suspended by administrator',
            })
            .where(eq(users.id, priest.userId));
    }

    // Reactivate / Unban priest account by priestProfile id
    async unbanPriest(priestId: string) {
        // 1. Find the priest profile to get the user ID
        const [priest] = await db
            .select({ userId: priestProfiles.userId })
            .from(priestProfiles)
            .where(eq(priestProfiles.id, priestId))
            .limit(1);

        if (!priest) {
            throw { statusCode: 404, message: 'Priest record not found.' };
        }

        // 2. Set account status to ACTIVE on the user record and clear banReason
        await db
            .update(users)
            .set({
                accountStatus: 'ACTIVE',
                banReason: null,
            })
            .where(eq(users.id, priest.userId));
    }

    // Get all devotee users joined with their booking counts
    async getAllUsers() {
        const records = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                phoneNumber: users.phoneNumber,
                role: users.role,
                accountStatus: users.accountStatus,
                banReason: users.banReason,
                avatarUrl: users.avatarUrl,
                createdAt: users.createdAt,
                bookingCount: sql<number>`cast(count(${bookings.id}) as int)`,
            })
            .from(users)
            .leftJoin(bookings, eq(users.id, bookings.userId))
            .where(eq(users.role, 'USER'))
            .groupBy(users.id);

        return records;
    }

    // Suspend a devotee user specifically
    async suspendUser(userId: string, reason?: string) {
        await db
            .update(users)
            .set({
                accountStatus: 'BANNED',
                banReason: reason || 'Suspended by administrator',
            })
            .where(eq(users.id, userId));
    }

    // Unsuspend / Reactivate a devotee user
    async unsuspendUser(userId: string) {
        await db
            .update(users)
            .set({
                accountStatus: 'ACTIVE',
                banReason: null,
            })
            .where(eq(users.id, userId));
    }
}

export const adminService = new AdminService();
