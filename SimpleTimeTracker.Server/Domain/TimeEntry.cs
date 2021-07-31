using System;

namespace SimpleTimeTracker
{
    public class TimeEntry : BaseEntity
    {
        public TimeEntry()
        {
        }
        
        public TimeEntry(
            DateTime startDate,
            Project project,
            DateTime? endDate,
            ProjectTask projectTask = null,
            string notes = null)
        {
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.Project = project;
            this.ProjectTask = projectTask;
            this.Notes = notes;
        }

        public DateTimeOffset StartDate { get; private set; }

        public DateTimeOffset? EndDate { get; private set; }

        public Project Project { get; set; }

        public ProjectTask ProjectTask { get; set; }

        public string Notes { get; private set; }

        public void ChangeStartDate(DateTimeOffset newStartDate)
        {
           if (newStartDate != DateTime.MinValue) this.StartDate = newStartDate;         
        }

        public void ChangeEndDate(DateTimeOffset newEndDate)
        {
           if (newEndDate != DateTime.MinValue) this.EndDate = newEndDate;         
        }

        public void ChangeNotes(string newNotes)
        {
           if (!string.IsNullOrEmpty(newNotes)) this.Notes = newNotes;         
        }
    }
}