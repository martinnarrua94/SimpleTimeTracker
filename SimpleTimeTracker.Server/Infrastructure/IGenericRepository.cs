using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace SimpleTimeTracker
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Get(IEnumerable<Expression<Func<TEntity, bool>>> filter = null,
                                Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
                                string includeProperties = "");

        TEntity GetByID(long id, string includeProperties = "");

        void Insert(TEntity entity);

        void Delete(long id);

        void Delete(TEntity entityToDelete);

        void Update(TEntity entityToUpdate);

        void Save();

        void Dispose();
    }
}