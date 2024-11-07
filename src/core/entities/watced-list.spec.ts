import { WatchedList } from './watched-list'

class NumberWatchList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('WatchedList', () => {
  it('should be able create a watched list initial items', () => {
    const list = new NumberWatchList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchList([1, 2, 3])

    list.remove(3)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([3])
  })

  it('should be able add an items even if it was removed before', () => {
    const list = new NumberWatchList([1, 2, 3])

    list.remove(3)
    list.add(3)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able remove an items even if it was added before', () => {
    const list = new NumberWatchList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    const list = new NumberWatchList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([5])
  })
})
