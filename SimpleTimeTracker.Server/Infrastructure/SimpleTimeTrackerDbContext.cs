using Microsoft.EntityFrameworkCore;

namespace SimpleTimeTracker
{
    public class SimpleTimeTrackerDbContext : DbContext
    {
        public SimpleTimeTrackerDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }

        public DbSet<TimeEntry> TimeEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>(opt =>
            {
                opt.ToTable("Projects");
                opt.HasKey(x => x.Id);
                opt.Property(x => x.Name);
                opt.Property(x => x.Notes).IsRequired(false);
            });

            modelBuilder.Entity<TimeEntry>(opt =>
            {
                opt.ToTable("TimeEntries");
                opt.HasKey(x => x.Id);
                opt.Property(x => x.StartDate);
                opt.Property(x => x.EndDate).IsRequired(false);
                opt.Property(x => x.Notes).IsRequired(false);
                opt.HasOne(x => x.Project).WithMany().HasForeignKey("ProjectId");
                opt.HasOne(x => x.ProjectTask).WithMany().HasForeignKey("ProjectTaskId").IsRequired(false);
            });

            modelBuilder.Entity<ProjectTask>(opt =>
            {
                opt.ToTable("ProjectTasks");
                opt.HasKey(x => x.Id);
                opt.Property(x => x.Name);
                opt.Property(x => x.Notes).IsRequired(false);
                opt.HasOne(x => x.Project).WithMany().HasForeignKey("ProjectId");
            });
        }
    }
}