using Microsoft.EntityFrameworkCore;

namespace SimpleTimeTracker
{
    public class TimeEntryRepository : GenericRepository<TimeEntry>
    {
        public TimeEntryRepository(SimpleTimeTrackerDbContext context) : base(context)
        {
            this.dbSet = context.Set<TimeEntry>();
        }

        public override void Insert(TimeEntry timeEntry)
        {
            dbSet.Add(timeEntry);

            context.Entry(timeEntry.Project).State = EntityState.Modified;

            if (timeEntry.ProjectTask is not null)
            {
                context.Entry(timeEntry.ProjectTask).State = EntityState.Modified;
            }         
        }
    }
}