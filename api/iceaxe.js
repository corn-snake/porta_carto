export default async function readDB (db, filter, specFlag, dbName) {
    if (specFlag === true) {
        let found;
        switch (dbName) {
            case "era":
                console.log(filter);
                found = await db.find({title:filter[0]}).toArray();
                return found.filter(i=>i.parent == filter[1]);
            default:
                throw new TypeError(dbName + " is not a specially-handled database.");
        }
    }
    const found = await db.find({title: filter||{$ne:null}}).toArray();
    return found;
}
