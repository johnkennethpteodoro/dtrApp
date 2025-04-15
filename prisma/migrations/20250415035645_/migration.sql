-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(20) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `department` VARCHAR(50) NOT NULL,
    `employment_status` VARCHAR(20) NOT NULL,
    `shift_schedule` VARCHAR(20) NOT NULL,
    `immediate_supervisor` VARCHAR(100) NOT NULL,
    `company_email` VARCHAR(100) NOT NULL,
    `contact_number` VARCHAR(20) NOT NULL,
    `employee_since` DATETIME(3) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `role` ENUM('EMPLOYEE', 'MANAGER', 'HR', 'ADMIN') NOT NULL DEFAULT 'EMPLOYEE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_employee_id_key`(`employee_id`),
    UNIQUE INDEX `User_company_email_key`(`company_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('OPEN', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
    `leave_type` ENUM('VACATION', 'SICK', 'UNPAID', 'EMERGENCY') NOT NULL,
    `start_date` VARCHAR(500) NOT NULL,
    `end_date` VARCHAR(500) NOT NULL,
    `reason` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `comments` VARCHAR(1000) NULL,
    `total_days` INTEGER NOT NULL,
    `employee_name` VARCHAR(500) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `approved_by_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_approved_by_id_fkey` FOREIGN KEY (`approved_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
