﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SimpleTimeTracker;

namespace SimpleTimeTracker.Migrations
{
    [DbContext(typeof(SimpleTimeTrackerDbContext))]
    [Migration("20210731192414_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SimpleTimeTracker.Project", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("SimpleTimeTracker.ProjectTask", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("ProjectId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectTasks");
                });

            modelBuilder.Entity("SimpleTimeTracker.TimeEntry", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("ProjectId")
                        .HasColumnType("bigint");

                    b.Property<long?>("ProjectTaskId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ProjectTaskId");

                    b.ToTable("TimeEntries");
                });

            modelBuilder.Entity("SimpleTimeTracker.ProjectTask", b =>
                {
                    b.HasOne("SimpleTimeTracker.Project", "Project")
                        .WithMany("ProjectTasks")
                        .HasForeignKey("ProjectId");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("SimpleTimeTracker.TimeEntry", b =>
                {
                    b.HasOne("SimpleTimeTracker.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");

                    b.HasOne("SimpleTimeTracker.ProjectTask", "ProjectTask")
                        .WithMany("TimeEntries")
                        .HasForeignKey("ProjectTaskId");

                    b.Navigation("Project");

                    b.Navigation("ProjectTask");
                });

            modelBuilder.Entity("SimpleTimeTracker.Project", b =>
                {
                    b.Navigation("ProjectTasks");
                });

            modelBuilder.Entity("SimpleTimeTracker.ProjectTask", b =>
                {
                    b.Navigation("TimeEntries");
                });
#pragma warning restore 612, 618
        }
    }
}