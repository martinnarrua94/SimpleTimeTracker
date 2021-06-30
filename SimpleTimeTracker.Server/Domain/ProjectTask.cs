using System.Collections.Generic;

namespace SimpleTimeTracker
{
    public class ProjectTask : BaseEntity
    {
        public ProjectTask()
        {
        }
        
        public ProjectTask(Project project, string name, string notes = null)
        {
            this.Project = project;
            this.Name = name;
            this.Notes = notes;
        }

        public Project Project { get; set; }

        public string Name { get; private set; }

        public string Notes { get; private set; }

        public bool Active { get; private set; } = true;

        public ICollection<TimeEntry> TimeEntries { get; set; }

        public void ChangeName(string newName)
        {
           if (!string.IsNullOrEmpty(newName)) this.Name = newName;         
        }

        public void ChangeNotes(string newNotes)
        {
           if (!string.IsNullOrEmpty(newNotes)) this.Notes = newNotes;         
        }

        public void LogicDelete()
        {
            this.Active = false;
        }
    }
}