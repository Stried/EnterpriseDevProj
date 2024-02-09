﻿// <auto-generated />
using System;
using EnterpriseDevProj;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EnterpriseDevProj.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20240209073935_Updatefriends3")]
    partial class Updatefriends3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.Cart", b =>
                {
                    b.Property<int>("CartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CartRoute")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("CartId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Carts");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.CartItem", b =>
                {
                    b.Property<int>("CartItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CartId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<float>("SubTotal")
                        .HasColumnType("float");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("CartItemId");

                    b.HasIndex("CartId");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("CartItems");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.CartParticipant", b =>
                {
                    b.Property<int>("CartParticipantId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CartItemId")
                        .HasColumnType("int");

                    b.Property<string>("CartParticipantEmail")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("CartParticipantName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("CartParticipantPhone")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("CartParticipantId");

                    b.HasIndex("CartItemId");

                    b.ToTable("CartParticipants");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Date", b =>
                {
                    b.Property<int>("DateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CartItemId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DateOfEvent")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DateUpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("varchar(60)");

                    b.HasKey("DateId");

                    b.HasIndex("CartItemId");

                    b.HasIndex("EventId");

                    b.ToTable("Dates");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ActivityType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Approval")
                        .HasColumnType("tinyint(1)");

                    b.Property<float>("AvgRating")
                        .HasColumnType("float");

                    b.Property<string>("ContentHTML")
                        .IsRequired()
                        .HasMaxLength(3000)
                        .HasColumnType("varchar(3000)");

                    b.Property<string>("DateType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("EventCreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("EventLocation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("varchar(60)");

                    b.Property<int>("EventPrice")
                        .HasColumnType("int");

                    b.Property<DateTime>("EventUpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateOnly>("ExpiryDate")
                        .HasColumnType("date");

                    b.Property<int>("FriendPrice")
                        .HasColumnType("int");

                    b.Property<int>("MaxPax")
                        .HasColumnType("int");

                    b.Property<int>("NTUCPrice")
                        .HasColumnType("int");

                    b.Property<int>("RemainingPax")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("EventId");

                    b.HasIndex("UserID");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Image", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CartItemId")
                        .HasColumnType("int");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ImageCreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("ImageUpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ImageId");

                    b.HasIndex("CartItemId");

                    b.HasIndex("EventId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.FriendsFolder.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("FromUser")
                        .HasColumnType("int");

                    b.Property<bool>("RequestApproved")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ToUser")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.Miscellaneous.Theme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Background")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Highlight")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Main")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Secondary")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Themes");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.TicketFolder.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AttachedFilename")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("SenderEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TicketBody")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("TicketCategory")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TicketHeader")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ImageFile")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NRIC")
                        .IsRequired()
                        .HasMaxLength(9)
                        .HasColumnType("varchar(9)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("UserRole")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.UserGroupLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("UserGroupId")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserGroupId");

                    b.HasIndex("UserID");

                    b.ToTable("UserGroupLinks");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.VoucherFolder.Voucher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("VoucherExpiry")
                        .HasColumnType("datetime");

                    b.Property<string>("VoucherName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.Property<int>("VoucherUses")
                        .HasColumnType("int");

                    b.Property<int>("VoucherValue")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Vouchers");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.Cart", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.UserFolder.User", "User")
                        .WithOne("Cart")
                        .HasForeignKey("EnterpriseDevProj.Models.CartFolder.Cart", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.CartItem", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.CartFolder.Cart", "Cart")
                        .WithMany("CartItems")
                        .HasForeignKey("CartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnterpriseDevProj.Models.EventFolder.Event", "Event")
                        .WithOne("CartItem")
                        .HasForeignKey("EnterpriseDevProj.Models.CartFolder.CartItem", "EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cart");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.CartParticipant", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.CartFolder.CartItem", "CartItem")
                        .WithMany("Participants")
                        .HasForeignKey("CartItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CartItem");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Date", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.CartFolder.CartItem", "CartItem")
                        .WithMany()
                        .HasForeignKey("CartItemId");

                    b.HasOne("EnterpriseDevProj.Models.EventFolder.Event", "Event")
                        .WithMany("Dates")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CartItem");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Event", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.UserFolder.User", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Image", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.CartFolder.CartItem", "CartItem")
                        .WithMany()
                        .HasForeignKey("CartItemId");

                    b.HasOne("EnterpriseDevProj.Models.EventFolder.Event", "Event")
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CartItem");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.FriendsFolder.Friend", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.UserFolder.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.UserGroup", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.UserFolder.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.UserGroupLink", b =>
                {
                    b.HasOne("EnterpriseDevProj.Models.UserFolder.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId");

                    b.HasOne("EnterpriseDevProj.Models.UserFolder.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("UserGroup");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.Cart", b =>
                {
                    b.Navigation("CartItems");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.CartFolder.CartItem", b =>
                {
                    b.Navigation("Participants");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.EventFolder.Event", b =>
                {
                    b.Navigation("CartItem");

                    b.Navigation("Dates");
                });

            modelBuilder.Entity("EnterpriseDevProj.Models.UserFolder.User", b =>
                {
                    b.Navigation("Cart");

                    b.Navigation("Events");

                    b.Navigation("UserGroups");
                });
#pragma warning restore 612, 618
        }
    }
}
