count1 = 1
count2 = 2
print(count1)
print(count1)

def test():
    nums = {
        1: True,
        2: True,
        3: True,
    }
    for item in nums:
        print(item)
        if item in nums:
            print('item in nums',item in nums)

    return []

test()