using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace SimpleTimeTracker 
{
    [ApiController]
    [Route("[controller]")]
    public class TimeEntriesController : ControllerBase
    {
        private IGenericRepository<TimeEntry> timeEntryRepository;
        private IGenericRepository<Project> projectRepository;
        private IGenericRepository<ProjectTask> projectTaskRepository;
        private IMapper mapper;

        private const string IncludeProperties = "Project,ProjectTask";

        public TimeEntriesController(
            IGenericRepository<TimeEntry>  timeEntryRepository,
            IGenericRepository<Project> projectRepository,
            IGenericRepository<ProjectTask> projectTaskRepository,
            IMapper mapper)
        {
            this.timeEntryRepository = timeEntryRepository;
            this.projectRepository = projectRepository;
            this.projectTaskRepository = projectTaskRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<TimeEntryDTO> GetAll()
        {
            var activeFilter = new List<Expression<Func<TimeEntry, bool>>>()
            { 
                x => x.ProjectTask.Active,
                x => x.Project.Active 
            };

            var timeEntries = this.timeEntryRepository.Get(
                includeProperties: IncludeProperties,
                filter: activeFilter,
                orderBy: x => x.OrderBy(y => y.StartDate))
                .ToList();

            return mapper.Map<IEnumerable<TimeEntryDTO>>(timeEntries);
        }

        [HttpGet("{id}")]
        public ActionResult<TimeEntryDTO> GetById(long id)
        {
            var timeEntry = timeEntryRepository.GetByID(id, includeProperties: IncludeProperties);
            
            var timeEntryDTO = mapper.Map<TimeEntryDTO>(timeEntry);
            
            return Ok(timeEntryDTO);       
        }

        [HttpPost("byFilter")]
        public IEnumerable<TimeEntryDTO> GetByFilter(TimeEntryFilterDTO filter)
        {
            List<Expression<Func<TimeEntry, bool>>> expressions = new List<Expression<Func<TimeEntry, bool>>>();

            expressions.Add(x => x.ProjectTask.Active);
            expressions.Add(x => x.Project.Active);

            if (filter.RangeStartDate.HasValue)
            {
                expressions.Add(x => x.StartDate >= filter.RangeStartDate.Value);
            }

            if (filter.RangeEndDate.HasValue)
            {
                expressions.Add(x => x.StartDate <= filter.RangeEndDate.Value);
            }

            if (filter.ProjectId is not null)
            {
                expressions.Add(x => x.Project.Id == filter.ProjectId);
            }

            if (filter.ProjectTaskId is not null)
            {
                expressions.Add(x => x.ProjectTask.Id == filter.ProjectTaskId);
            }

            var timeEntries = this.timeEntryRepository.Get(
                filter: expressions,
                includeProperties: IncludeProperties,
                orderBy: x => x.OrderBy(y => y.StartDate)).ToList();

            return mapper.Map<IEnumerable<TimeEntryDTO>>(timeEntries);
        }

        [HttpPost]
        public ActionResult<TimeEntryDTO> Post(TimeEntryCreateDTO timeEntryData)
        {
            var project = projectRepository.GetByID(timeEntryData.ProjectId);
            var projectTask = projectTaskRepository.GetByID(timeEntryData.ProjectTaskId);

            var timeEntry = new TimeEntry(startDate: timeEntryData.StartDate,
                                        endDate: timeEntryData.EndDate,
                                        project: project,
                                        projectTask: projectTask,
                                        notes: timeEntryData.Notes);

            timeEntryRepository.Insert(timeEntry);
            timeEntryRepository.Save();

            return GetById(timeEntry.Id);
        }

        [HttpPut("{id}")]
        public ActionResult<TimeEntryDTO> Update(TimeEntryUpdateDTO timeEntryData, long id)
        {
            var timeEntry = timeEntryRepository.GetByID(id);

            timeEntry.ChangeEndDate(timeEntryData.EndDate);
            timeEntry.ChangeNotes(timeEntryData.Notes);

            this.timeEntryRepository.Update(timeEntry);
            this.timeEntryRepository.Save();

            return GetById(timeEntry.Id);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var timeEntry = timeEntryRepository.GetByID(id);

            this.timeEntryRepository.Delete(timeEntry);
            this.timeEntryRepository.Save();

            return Ok();
        }

        [HttpPost("seed")]
        public void Seed()
        {
            var projects = new List<Project>()
            {
                new Project(name: "Radio 9", notes: "Notas de Radio 9"),
                new Project(name: "INER", notes: "Notas de INER")
            };

            foreach (var project in projects)
            {
                this.projectRepository.Insert(project);
            }

            this.projectRepository.Save();

            var projectTasks = new List<ProjectTask>()
            {
                new ProjectTask(project: projectRepository.GetByID(1), name: "Carga de notas", notes: "Notas de Carga de notas"),
                new ProjectTask(project: projectRepository.GetByID(1), name: "Diseño de posteo", notes: "Notas de Diseño de posteo"),
                new ProjectTask(project: projectRepository.GetByID(2), name: "Redaccion", notes: "Notas de Redaccion"),
                new ProjectTask(project: projectRepository.GetByID(2), name: "Posteo en Facebook", notes: "Notas de Posteo en Facebook")
            };

            foreach (var projectTask in projectTasks)
            {
                this.projectTaskRepository.Insert(projectTask);
            }

            this.projectTaskRepository.Save();

            var timeEntries = new List<TimeEntry>()
            {
                new TimeEntry(startDate: DateTime.Now.AddDays(-2), endDate: DateTime.Now.AddDays(-2), project: projectRepository.GetByID(1), projectTask: projectTaskRepository.GetByID(1)),
                new TimeEntry(startDate: DateTime.Now.AddDays(-4), endDate: DateTime.Now.AddDays(-4), project: projectRepository.GetByID(1)),
                new TimeEntry(startDate: DateTime.Now, endDate: null, project: projectRepository.GetByID(1), projectTask: projectTaskRepository.GetByID(2)),
                new TimeEntry(startDate: DateTime.Now.AddDays(-3), endDate: DateTime.Now.AddDays(-3), project: projectRepository.GetByID(2), projectTask: projectTaskRepository.GetByID(3)),
                new TimeEntry(startDate: DateTime.Now.AddDays(-2), endDate: DateTime.Now.AddDays(-2), project: projectRepository.GetByID(2)),
                new TimeEntry(startDate: DateTime.Now.AddDays(-1), endDate: null, project: projectRepository.GetByID(2), projectTask: projectTaskRepository.GetByID(4))
            };

            foreach (var timeEntry in timeEntries)
            {
                timeEntryRepository.Insert(timeEntry);
            }

            timeEntryRepository.Save();
        }
    }
}