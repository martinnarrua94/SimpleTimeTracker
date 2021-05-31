using Microsoft.EntityFrameworkCore;

namespace SimpleTimeTracker
{
    public class ProjectTaskRepository : GenericRepository<ProjectTask>
    {
        public ProjectTaskRepository(SimpleTimeTrackerDbContext context) : base(context)
        {
            this.dbSet = context.Set<ProjectTask>();
        }

        public override void Insert(ProjectTask projectTask)
        {
            dbSet.Add(projectTask);

            context.Entry(projectTask.Project).State = EntityState.Modified;
        }
    }
}