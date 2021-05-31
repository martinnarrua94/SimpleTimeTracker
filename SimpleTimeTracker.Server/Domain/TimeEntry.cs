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

        public DateTime StartDate { get; private set; }

        public DateTime? EndDate { get; private set; }

        public Project Project { get; set; }

        public ProjectTask ProjectTask { get; set; }

        public string Notes { get; private set; }

        public void ChangeStartDate(DateTime newStartDate)
        {
           if (newStartDate != DateTime.MinValue) this.StartDate = newStartDate;         
        }

        public void ChangeEndDate(DateTime newEndDate)
        {
           if (newEndDate != DateTime.MinValue) this.EndDate = newEndDate;         
        }

        public void ChangeNotes(string newNotes)
        {
           if (!string.IsNullOrEmpty(newNotes)) this.Notes = newNotes;         
        }
    }
}